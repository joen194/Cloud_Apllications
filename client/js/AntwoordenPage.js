Template.AntwoordenPage.events({
	'click .showAntwoordenPage': function(e){
		e.preventDefault();
		Session.set('tijdelijkVraagId', this._id);

		Meteor.subscribe('DataAntwoorden', this._id);

		$(".divAntwoordenPageSluiten").hide();
		$('#div' + this._id).toggle(500);

	}

});

Template.AntwoordenPage.helpers({
	AntwoordenLoop: function() {
		tijdelijkLesId = $.cookie('tijdelijkIdSession');
		return Vragen.find({lessenId: tijdelijkLesId});
	},

	AntwoordInVraag: function(){
		tijdelijkId = Session.get('tijdelijkVraagId');
		return Antwoorden.find({vraagId: tijdelijkId});
	}
});