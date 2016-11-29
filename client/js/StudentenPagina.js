Meteor.subscribe('antwoorden');

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
	}
});