

Template.StudentenPagina.events({
		'click #submitAntwoord': function(e){
		e.preventDefault();
		var tijdelijkeVraagId = "Njirz9PG7emjoQYqz";
		var naam = $('#naamInput').val();
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
			Meteor.call('NaamInDatabase', naam, clientId, Lesinfo.roomCode, function(error, res) {
			if (error)
				return alert(error.reason);
			});

			showAntwoordInput();

		} else alert("Vul je naam in");

	},


});

Template.StudentenPagina.helpers ({
	oneMultipleChoice: function (){
		console.log("in helpers");
		var roomCode = window.location.hash.substr(1);
		var tijdelijkeDbStudentenPagina = Lessen.find({roomCode: roomCode}).fetch();
		return MultipleChoice.find({vragenId: tijdelijkeDbStudentenPagina[0].vraagId});
	},
	openAntwoord: function(){
		console.log("in get");
		

		var roomCode = window.location.hash.substr(1);
		var tijdelijkeDbStudentenPagina = Lessen.find({roomCode: roomCode}).fetch();
		console.log(tijdelijkeDbStudentenPagina);
		var checkOpenVraag = Vragen.find({_id: tijdelijkeDbStudentenPagina[0].vraagId}).fetch();
	
		console.log(checkOpenVraag[0].openVraag);
		if (checkOpenVraag[0].openVraag == true){
			console.log("hey");
			return true;
		}
		else {
			console.log("multi");
			return false;
		}		
	}, 

	
});

function showAntwoordInput() {

	console.log("SHow Antwoord input");
	$("#NaamInputDiv").fadeOut(500);

	setTimeout(function(){
 		$("#AntwoordInputDiv").fadeIn(500);
	}, 500);

	 	

}