Meteor.subscribe('antwoorden');
Meteor.subscribe('Aanwezigen');

Template.StudentenPagina.events({
		'click #enterRoom' : function(e){
		e.preventDefault();

		var roomCodeInput = $('#roomCodeField').val();
		var	Lesinfo;


		Meteor.call('getRoomcode', roomCodeInput ,function(err, response) {
			if(err) {
				alert(err);
				Lesinfo = false;
				return;
			}
			Lesinfo = response;

			console.log(response);
			/*if (!Lesinfo) {
				$('#NaamInputDiv').toggle();
			}*/
		});

	},'click #submitAntwoord': function(e){
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

	'click #enterName': function(e) {
		e.preventDefault();
		console.log(Meteor.default_connection._lastSessionId);
		var clientId = Meteor.default_connection._lastSessionId;

		var naam = $('#naamInput').val();
		if (naam.length > 0) {
			Meteor.call('NaamInDatabase', naam, clientId,  function(error, res) {
			if (error)
				return alert(error.reason);
			});
		} else alert("Vul je naam in");
	}
});
