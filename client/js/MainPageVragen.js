Meteor.subscribe('DataVragen');
Meteor.subscribe('DataAntwoorden');
var editVraagIsTrue = true;

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

		Meteor.call('VraagToevoegen', vraagTitel, tijdelijkId, tijdelijkeRoomCode, function(error, res){
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
	showEdit: function() {
		return Session.get('showEdit');
	},
	editAnswer: function(){
		var tijdelijkVraagId = Session.get('tijdelijkVraagId2');
		console.log(tijdelijkVraagId);
		//Session.set('showEdit', false);
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
	'click #editVraag':function(e) {
		e.preventDefault();
	
		if (editVraagIsTrue){
			Session.set('showEdit', true);
			editVraagIsTrue = false;			
		} else {
			Session.set('showEdit', false);
			editVraagIsTrue = true;
		}

		Session.set('tijdelijkVraagId2', this._id);
	}
});

//################ Om een vraag zichtbaar te maken #######################
