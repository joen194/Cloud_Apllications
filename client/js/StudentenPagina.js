Meteor.subscribe('antwoorden');
Meteor.subscribe('Aanwezigen');

var Lesinfo;

Template.StudentenPagina.events({
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
	},
//******************************** Code die de naam in de database zet ******************************
	'click #enterName': function(e) {
		e.preventDefault();
		var clientId = Meteor.default_connection._lastSessionId;

		var naam = $('#naamInput').val();
		if (naam.length > 0) {
			Meteor.call('NaamInDatabase', naam, clientId,  function(error, res) {
			if (error)
				return alert(error.reason);
			});

			showAntwoordInput();

		} else alert("Vul je naam in");

	}
});

function showAntwoordInput() {
	$("#NaamInputDiv").fadeOut(500);

	setTimeout(function(){
 		$("#AntwoordInputDiv").fadeIn(500);
	}, 500);
		 	

}