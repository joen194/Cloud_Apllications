Meteor.subscribe('DataVragen');

Template.MainPageVragen.onRendered (function(){
	Session.set('showOpenvraag', false);
	Session.set('showMeerkeuzevraag', false);
	Session.set('meerkeuzeBevestigt', false);
	Session.set('aangemaakt',false);
});

//###################### Om een vraag aan te maken ###########################
Template.MainPageVragen.events({

	'click #addVraag' : function(e){
		e.preventDefault();

		var vraagTitel = $('#TitelVraag').val();

		var tijdelijkId = Session.get('tijdelijkIdSession');		

		Meteor.call('VraagToevoegen', vraagTitel, tijdelijkId, function(error, res){
		if (error)
			return alert(error.reason);
		var idVraag = res;
		console.log(idVraag);
		});

		Session.set('aangemaakt',true);
		Session.set('showOpenvraag', true);

	},
	'click #bevestigAntwoord':function(e){


	},
	'click #Openvraag': function(e) {
		Session.set('showOpenvraag', true);
		Session.set('showMeerkeuzevraag', false);

	}, 
	'click #Meerkeuzevraag': function(e) {
		Session.set('showOpenvraag', false);
		Session.set('showMeerkeuzevraag', true);
	}

});
//######################### helpers ##############################
Template.MainPageVragen.helpers({
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
		var tijdelijkId = Session.get('tijdelijkIdSession');
		return Vragen.find({lessenId: tijdelijkId});
	}
});

//################ Om een vraag te deleten #######################
Template.OverzichtVragen.events({
	'click #deleteVraag': function(e){
		e.preventDefault();

		Meteor.call('VraagVerwijderen', this._id, function(error, id){
		if (error)
			return alert(error.reason);
		});

	}
})