Meteor.subscribe('DataVragen');
Meteor.subscribe('DataAntwoorden');

var editVraagIsTrue = true;
var j = 0;
var tijdelijkEditId = [] ;

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
	'click #bevestigAntwoord':function(e){
		e.preventDefault();
		var antwoordInput = $('#antwoordInput').val();
		var tijdelijkVraagId = Session.get('tijdelijkVraagId');
		console.log(tijdelijkVraagId);

		Meteor.call('AntwoordToevoegen', antwoordInput, tijdelijkVraagId, function(error,res) {
			if (error)
				return alert(error.reason);
			else
				return alert("Antwoord aangemaakt");
		});
		$('#antwoordInput').val('');
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
	editAnswer: function(){
		//var tijdelijkVraagId = Session.get('tijdelijkVraagId2');
		return Antwoorden.find({vragenId: tijdelijkVraagId});
	}
	
});

//################ Om een vraag te deleten, showen en editen #######################
Template.OverzichtVragen.events({
	'click #showVraag' : function(e){
		e.preventDefault();

		Session.set('showVraag', false);
		Session.set('showVraagOpBord', true); 

		Session.set('idVanVraag', this._id);

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
		//console.log(e.currentTarget.id);
	

		var obj = Antwoorden.find();
		var db = obj.collection._docs._map;
		var editId;		

		if ($.inArray(this._id, tijdelijkEditId) != -1) {
			console.log(this._id);
			$("#div" + this._id).toggle();
		}
		else {
			tijdelijkEditId[j] = this._id;
			j++;
			//$("#div" + this._id).append("<p>" + this.vraagnaam + "</p>");*
			var $input = document.createElement("input");
			$input.id = this._id;
			$input.value = this.vraagnaam;
			$input.type = "text";
			$("#div" + this._id).append($input);
			for (var item in db) {	
				editId = eval("obj.collection._docs._map." + item + ".vragenId");
				if (editId == this._id) {
					var tijdelijkAntwoord = eval("obj.collection._docs._map." + item + ".antwoord");
					$("#div" + this._id).append("<br>" + "<br>");
					$input = document.createElement("input");
					$input.value = tijdelijkAntwoord;
					tijdelijkAntwoord = eval("obj.collection._docs._map." + item + "._id");
					$input.id = tijdelijkAntwoord;
					$("#div" + this._id).append($input);
				}
			}
			$input = document.createElement("button");
			t = document.createTextNode("Save");       // Create a text node
			$input.appendChild(t);
			$input.id = "saveAntwoorden";
			$input.type = "button";
			$("#div" + this._id).append($input);
			$("#div" + this._id).toggle();
		}					
	},
	'click #saveAntwoorden':function(e) {
		e.preventDefault();

		console.log(this._id);

		//var titelAanpassen = $('#' + this._id).val();
		var titelAanpassen = "Vraag 1";
		console.log(titelAanpassen);
		Meteor.call('VraagAanpassen', titelAanpassen, this._id, function(error, id){

		if (error)
			return alert(error.reason);
		});

		var obj = Antwoorden.find();
		var db = obj.collection._docs._map;
		for (var item in db) {
			var ophalenVragenId =	eval("obj.collection._docs._map." + item + ".vragenId");
			if (ophalenVragenId == this._id) {
				var ophalenInputsId =	eval("obj.collection._docs._map." + item + "._id");
				var antwoordAanpassen = "Test1"; //$('#' + ophalenInputsId).val();
				Meteor.call('AntwoordAanpassen', antwoordAanpassen, ophalenInputsId, function(error, id){

				if (error)
					return alert(error.reason);
				});
			}			
		}
	}
});

//################ Om een vraag zichtbaar te maken #######################
