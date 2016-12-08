
//var editVraagIsTrue = true;
//var j = 0;
//var tijdelijkEditId = [] ;

Template.MainPageVragen.onRendered (function(){
	Session.set('showOpenvraag', false);
	Session.set('showMeerkeuzevraag', false);
	Session.set('meerkeuzeBevestigt', false);
	Session.set('aangemaakt',false);
});
var tijdelijkVraagId;
var tijdelijkeRoomCode;
var tijdelijkLesId;
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

		if(vraagTitel !== ""){

			Meteor.call('VraagToevoegen', vraagTitel, tijdelijkLesId, tijdelijkeRoomCode, function(error, res){
				if (error){
					return alert(error.reason);
				}

				tijdelijkVraagId = res;
			});
			
			Session.set('aangemaakt',true);
			Session.set('showOpenvraag', true);
			Session.set('nieuweVraag',false);
		}else{
			alert("Vul een vraag in");
		}

	},
//#################### Knop voor meerkeuzeantwoord te bevestigen ##########################
	'click #AddMPAntwoord':function(e){
		e.preventDefault();
		var multipleChoiceInput = $('#multipleChoiceInput').val();

		if (multipleChoiceInput !== "") {
			

			Meteor.call('MultipleChoiceToevoegen', multipleChoiceInput, tijdelijkVraagId, tijdelijkLesId, function(error,res) {
				if (error)
					return alert(error.reason);
				else{
					//$("#divMPCToevoegen").append("<p>" + multipleChoiceInput+ "</p>");
					//$("#divMPCToevoegen").append("<button class='buttonRemoveMultipleChoice' id="+MPC_ID+" type='button'>X</button>")
				}
			});
		}
		$('#multipleChoiceInput').val('');
	},
//############################### Radio button voor openvraag #################################
	'change #Openvraag': function(e) {
		e.preventDefault();
		Session.set('showOpenvraag', true);
		Session.set('showMeerkeuzevraag', false);
		Meteor.call('OpenVraag', tijdelijkVraagId);
		Meteor.myFunctions.DeleteAllMPC(tijdelijkVraagId);
	}, 
//######################## Radio button voor meerkeuzevraag ###################################
	'change #Meerkeuzevraag': function(e) {
		e.preventDefault();
		Session.set('showOpenvraag', false);
		Session.set('showMeerkeuzevraag', true);
		Meteor.call('Meerkeuzevraag', tijdelijkVraagId);
		
	},

	'click #showVragenBord': function(e){
		e.preventDefault();

		var win = window.open("http://localhost:3000/roomCodeLeerkrachten" + "#" + tijdelijkeRoomCode + "/" + tijdelijkLesId, "" ,"fullscreen=yes");
		
	},
	'click .buttonRemoveMultipleChoice': function(e){
		e.preventDefault();
		Meteor.myFunctions.DeleteMPC(e.currentTarget.id);
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
	},

	aanwezigheid: function(){
		tijdelijkeRoomCode = Session.get('getRoomCode');
		return Aanwezigen.find({roomCode: tijdelijkeRoomCode});
		//return Antwoorden.find();
	},MPCAntwoorden: function(){
		return MultipleChoice.find({vragenId: tijdelijkVraagId});
	}
});

//################ Om de juiste vragen uit de DB te halen #######################
Template.OverzichtVragen.helpers({
	historyVraag : function(){
		tijdelijkLesId = Session.get('tijdelijkIdSession');
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
		Meteor.call('VraagIdAanpassen', this.lessenId, this._id, function(error, id){
		if (error)
			return alert(error.reason);
		});

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

		var titelAanpassen = $("#input" + this._id).val();
		Meteor.call('VraagAanpassen', titelAanpassen, this._id, function(error, id){

		if (error)
			return alert(error.reason);
		});

		var db = MultipleChoice.find({vragenId: this._id}).fetch();

		for (var item in db) {
			if(item.vragenId == this._id) {
				var ophalenInputsId = item._id;
				var multipleChoiceAanpassen = $('#input' + ophalenInputsId).val();
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
		Meteor.myFunctions.DeleteMPC(e.currentTarget.id);
	},
	//######################## Antwoorden zichtbaar maken op het bord ###################################
	'change #checker': function() {
    // Also, no need for the pound sign here
    // Also, no need for the pound sign here
    if (document.getElementById('checker').checked){
    	Meteor.call('AntwoordZichtbaarheid', true, this._id, function(error,res) {  
    	console.log("helaba");		
			if (error)
				return alert(error.reason);
		});
    }
    else{
    	Meteor.call('AntwoordZichtbaarheid', false, this._id, function(error,res) {  		
			if (error)
				return alert(error.reason);
		});
    }
}
});

