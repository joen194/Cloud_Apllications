
var setDiv = false;
var tijdelijkeVraagId;
var naamStudent;
Template.StudentenPagina.events({
		'click #submitAntwoordOpen': function(e){
		e.preventDefault();

		var tijdelijkAntwoord = $('#antwoordField').val();
		Meteor.call('AntwoordToevoegen', tijdelijkeVraagId[0].vraagId, tijdelijkAntwoord, naamStudent, function(error, res){
		if (error)
			return alert(error.reason);
		});
		

		setTimeout(function(){
 			$("#AntwoordInputDiv").fadeOut(1);
		});
	},
	'click #submitAntwoordMPC': function(e){
		e.preventDefault();
		var naam = $('#naamInput').val();
	
		var tijdelijkAntwoord = document.querySelector('input[name="multipleChoices"]:checked').value;

		Meteor.call('MultipleChoiceChosenToevoegen', tijdelijkAntwoord, tijdelijkeVraagId[0]._id,  function(error, res){
		if (error)
			return alert(error.reason);
		});
		Meteor.call('AntwoordToevoegen', tijdelijkeVraagId[0].vraagId, tijdelijkAntwoord, naamStudent, function(error, res){
		if (error)
			return alert(error.reason);
		});

		setTimeout(function(){
 			$("#AntwoordInputDiv").fadeOut(1);
		});
	},
//******************************** Code die de naam in de database zet ******************************
	'click #enterName': function(e) {
		e.preventDefault();

		var clientId = Meteor.default_connection._lastSessionId;
		var naam = $('#naamInput').val();
		if (naam.length > 0) {
				Meteor.call('NaamInDatabase', naam, clientId, Lesinfo.roomCode, function(error, res) {
				if (error){
					alert(error.reason);
					return;
				}
				else {
					if (res) {
						naamStudent = naam;
						showAntwoordInput();
					}else alert("Naam al in gebruik!");
					return;
				}

			});
			

		
		}
		else alert("Vul je naam in");
		
	}

});

Template.StudentenPagina.helpers ({
	oneMultipleChoice: function (){
		var roomCode = window.location.hash.substr(1);
		var tijdelijkeDbStudentenPagina = Lessen.find({roomCode: roomCode}).fetch();
		tijdelijkeVraagId = tijdelijkeDbStudentenPagina[0].vraagId;
		console.log(tijdelijkeDbStudentenPagina);
		var mp = MultipleChoice.find().fetch();
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
		tijdelijkeVraagId = tijdelijkeDbStudentenPagina[0].vraagId;
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