Meteor.subscribe('DataVragen');

Template.MainPageVragen.onRendered (function(){
	Session.set('showOpenvraag', true);
	Session.set('meerkeuzeBevestigt', false);
});

//###################### Om een vraag aan te maken ###########################
Template.MainPageVragen.events({

	'click #addVraag' : function(e){
		e.preventDefault();

		var vraagTitel = $('#TitelVraag').val();

		var tijdelijkId = Session.get('tijdelijkIdSession');		

		Meteor.call('VraagToevoegen', vraagTitel, tijdelijkId, function(error, id){
		if (error)
			return alert(error.reason);
		});

	}, 
	'click #Openvraag': function(e) {
		Session.set('showOpenvraag', true);

	}, 
	'click #Meerkeuzevraag': function(e) {
		Session.set('showOpenvraag', false);
	}

});
//######################### helpers ##############################
Template.MainPageVragen.helpers({
	showOpenvraag: function(){
		return Session.get('showOpenvraag');
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