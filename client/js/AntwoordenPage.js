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
		return Vragen.find({lessenId: tijdelijkLesId});
	},

	AntwoordInVraag: function(){
		tijdelijkId = Session.get('tijdelijkVraagId');
		console.log(tijdelijkId);
		console.log(Antwoorden.find({vraagId: tijdelijkId}));
		return Antwoorden.find({vraagId: tijdelijkId});
	}
});