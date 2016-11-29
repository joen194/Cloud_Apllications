Meteor.subscribe('antwoorden');

Template.studentenZienVraagView.events({
	'click #submitAntwoord': function(e){
		e.preventDefault();
		var tijdelijkeVraagId = "u9rB6aNSmtXoLutFF"
		var naam = "jeroen";
		var tijdelijkAntwoord = $('#antwoordField').val();


		Meteor.call('AntwoordToevoegen', tijdelijkeVraagId, tijdelijkAntwoord, naam, function(error, res){
		if (error)
			return alert(error.reason);
		});
		console.log("gelukt");
	}
});