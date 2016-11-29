Meteor.subscribe('DataVragen');
Meteor.subscribe('DataMultipleChoice');

//var editVraagIsTrue = true;
//var j = 0;
//var tijdelijkEditId = [] ;

Template.MainPageVragen.onRendered (function(){
	Session.set('showOpenvraag', false);
	Session.set('showMeerkeuzevraag', false);
	Session.set('meerkeuzeBevestigt', false);
	Session.set('aangemaakt',false);
});

//###################### Vraag field resetten ###########################
Template.MainPageVragen.events({
	'click #voegVraagToe': function(e){
		e.preventDefault();

		Session.set('nieuweVraag',true);
		Session.set('showOpenvraag', false);
		Session.set('showMeerkeuzevraag', false);
		Session.set('aangemaakt',false);
	},
	
//#################### Vraag toevoegen aan database ##########################
	'click #addVraag' : function(e){
		e.preventDefault();

		var vraagTitel = $('#TitelVraag').val();

		var tijdelijkLesId = Session.get('tijdelijkIdSession');	
		var tijdelijkeRoomCode = Session.get('getRoomCode');	
		Meteor.call('VraagToevoegen', vraagTitel, tijdelijkLesId, tijdelijkeRoomCode, function(error, res){
		if (error)
			return alert(error.reason);
		});
		Session.set('aangemaakt',true);
		Session.set('showOpenvraag', true);
		Session.set('nieuweVraag',false);

	},
//#################### Knop voor meerkeuzeantwoord te bevestigen ##########################
	'click #bevestigMultipleChoice':function(e){
		e.preventDefault();
		var multipleChoiceInput = $('#multipleChoiceInput').val();
		var tijdelijkVraagId = Session.get('tijdelijkVraagId');
		console.log(tijdelijkVraagId);

		Meteor.call('MultipleChoiceToevoegen', multipleChoiceInput, tijdelijkVraagId, function(error,res) {
			if (error)
				return alert(error.reason);
			else
				return alert("MultipleChoice aangemaakt");
		});
		$('#multipleChoiceInput').val('');
	},
//############################### Radio button voor openvraag #################################
	'click #Openvraag': function(e) {
		e.preventDefault();
		Session.set('showOpenvraag', true);
		Session.set('showMeerkeuzevraag', false);

	}, 
//######################## Radio button voor meerkeuzevraag ###################################
	'click #Meerkeuzevraag': function(e) {
		e.preventDefault();
		Session.set('showOpenvraag', false);
		Session.set('showMeerkeuzevraag', true);
	}

});
//################################## helpers #########################################
Template.MainPageVragen.helpers({
	nieuweVraag: function(){
		return Session.get('nieuweVraag');
	},
	showOpenvraag: function(){
		return Session.get('showOpenvraag');
	},
	showMeerkeuzevraag: function(){
		return Session.get('showMeerkeuzevraag');
	},
	aangemaakt: function(){
		return Session.get('aangemaakt');
	}
});

//################ Om de juiste vragen uit de DB te halen #######################
Template.OverzichtVragen.helpers({
	historyVraag : function(){
		var tijdelijkLesId = Session.get('tijdelijkIdSession');
		return Vragen.find({lessenId: tijdelijkLesId});
	},
	multipleChoiceHTML: function(){
		var tijdelijkVraagId = Session.get('tijdelijkVraagId2');
		return MultipleChoice.find({vragenId: tijdelijkVraagId});
	},	
});

//################ Om een vraag te deleten, showen en editen #######################
Template.OverzichtVragen.events({
	'click #showVraag' : function(e){
		e.preventDefault();

		Session.set('showVraag', false);
		Session.set('showVraagOpBord', true); 

		Session.set('idVanVraag', this._id);
		var win = window.open("http://localhost:3000/leerkracht", "", "width=200,height=100");

	},
	'click #deleteVraag': function(e){
		e.preventDefault();

		Meteor.call('VraagVerwijderen', this._id, function(error, id){

		if (error)
			return alert(error.reason);
		});
	},
	'click .editVraag':function(e) {
		e.preventDefault();
		Session.set('tijdelijkVraagId2', this._id);
		$(".divEditSluiten").hide();
		$('#div' + this._id).toggle(500);						

		/*var obj = MultipleChoice.find();
		var db = obj.collection._docs._map;
		console.log(db);

		var editId;		

		if ($.inArray(this._id, tijdelijkEditId) != -1) {
			$("#div" + this._id).toggle();
		}
		else {
			tijdelijkEditId[j] = this._id;
			j++;
			//$("#div" + this._id).append("<p>" + this.vraagnaam + "</p>");*
			var $input = document.createElement("input");
			$input.id = "input" + this._id;
			$input.type = "text";
			$input.value = this.vraagnaam;
			$("#div" + this._id).append($input);
			for (var item in db) {	
				editId = eval("obj.collection._docs._map." + item + ".vragenId");
				if (editId == this._id) {
					var tijdelijkMultipleChoice = eval("obj.collection._docs._map." + item + ".multipleChoice");
					$("#div" + this._id).append("<br>" + "<br>");
					$input = document.createElement("input");
					$input.type = "text";
					$input.value = tijdelijkMultipleChoice;
					tijdelijkMultipleChoice = eval("obj.collection._docs._map." + item + "._id");
					$input.id = "input" + tijdelijkMultipleChoice;
					$("#div" + this._id).append($input);
				}
			}
			$input = document.createElement("button");
			t = document.createTextNode("Save");       // Create a text node
			$input.appendChild(t);
			$input.id = "saveMultipleChoice";
			$input.type = "button";
			$("#div" + this._id).append($input);
			$("#div" + this._id).toggle();
		}*/					
	},
	'click #saveMultipleChoice':function(e) {
		e.preventDefault();
		console.log(this._id);

		var titelAanpassen = $("#input" + this._id).val();
		Meteor.call('VraagAanpassen', titelAanpassen, this._id, function(error, id){

		if (error)
			return alert(error.reason);
		});

		var db = MultipleChoice.find({vragenId: this._id}).fetch();

		for (var item in db) {
			if(item.vragenId == this._id) {
				var ophalenInputsId = item._id;
				console.log(ophalenInputsId);
				var multipleChoiceAanpassen = $('#input' + ophalenInputsId).val();
				console.log(multipleChoiceAanpassen);
				Meteor.call('MultipleChoiceAanpassen', multipleChoiceAanpassen, ophalenInputsId, function(error, id){

				if (error)
					return alert(error.reason);
				});
			}

		}
		//***************************************oude save code ***************************************************
		/*

		var obj = MultipleChoice.find();
		var db = obj.collection._docs._map;
		//console.log(db);
		for (var item in db) {
			var ophalenVragenId =	eval("obj.collection._docs._map." + item + ".vragenId");
			if (ophalenVragenId == this._id) {
				var ophalenInputsId =	eval("obj.collection._docs._map." + item + "._id");
				var multipleChoiceAanpassen = $('#input' + ophalenInputsId).val();
				Meteor.call('MultipleChoiceAanpassen', multipleChoiceAanpassen, ophalenInputsId, function(error, id){

				if (error)
					return alert(error.reason);
				});
			}			
		}*/

		if ($("#extraMultipleChoiceAanmaken" + this._id).val() != ''){
			var multipleChoiceInput = $("#extraMultipleChoiceAanmaken" + this._id).val();

			Meteor.call('MultipleChoiceToevoegen', multipleChoiceInput, this._id, function(error,res) {
				if (error)
					return alert(error.reason);
			});


		}
		$("#extraMultipleChoiceAanmaken" + this._id).val('');
		$("#div" + this._id).toggle();
	},
	'click .buttonRemoveMultipleChoice': function(e){
		e.preventDefault();
		console.log(e.currentTarget.id);

		Meteor.call('MultipleChoiceVerwijderen', e.currentTarget.id, function(error,id) {
			if (error)
				return alert(error.reason);
		});
	}
});

//################ Om een vraag zichtbaar te maken #######################
