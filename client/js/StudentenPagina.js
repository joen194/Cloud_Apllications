
var setDiv = false;
Template.StudentenPagina.events({
		'click #submitAntwoord': function(e){
		e.preventDefault();

		var tijdelijkeVraagId = Lessen.find({roomCode: roomCode}).fetch();
		var checkOpenVraag = Vragen.find({_id: tijdelijkeVraagId[0].vraagId}).fetch();
		var naam = $('#naamInput').val();
	
		if (checkOpenVraag[0].openVraag == true){

			var tijdelijkAntwoord = $('#antwoordField').val();
			Meteor.call('AntwoordToevoegen', tijdelijkeVraagId[0].vraagId, tijdelijkAntwoord, naam, function(error, res){
			if (error)
				return alert(error.reason);
			});
		}
		else {
			var tijdelijkAntwoord = document.querySelector('input[name="multipleChoices"]:checked').value;
			Meteor.call('AntwoordToevoegen', tijdelijkeVraagId[0].vraagId, tijdelijkAntwoord, naam, function(error, res){
			if (error)
				return alert(error.reason);
			});
		}

		setTimeout(function(){
 			$("#AntwoordInputDiv").fadeOut(500);
		}, 500);
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
		var roomCode = window.location.hash.substr(1);
		var tijdelijkeDbStudentenPagina = Lessen.find({roomCode: roomCode}).fetch();
		console.log(tijdelijkeDbStudentenPagina);
		var mp = MultipleChoice.find().fetch();
		console.log(mp);
		return MultipleChoice.find({vragenId: tijdelijkeDbStudentenPagina[0].vraagId});
	},
	openAntwoord: function(){
		if (setDiv){
			setTimeout(function(){
 				$("#AntwoordInputDiv").fadeIn(500);
			}, 500);
		}

		var roomCode = window.location.hash.substr(1);
		var tijdelijkeDbStudentenPagina = Lessen.find({roomCode: roomCode}).fetch();
		var checkOpenVraag = Vragen.find({_id: tijdelijkeDbStudentenPagina[0].vraagId}).fetch();
	
		if (checkOpenVraag[0].openVraag == true){
			return true;
		}
		else {
			return false;
		}		
	}, 

	
});

function showAntwoordInput() {
	$("#NaamInputDiv").fadeOut(500);

	setTimeout(function(){
 		$("#AntwoordInputDiv").fadeIn(500);
	}, 500);
	setDiv = true;
}