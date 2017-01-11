
var setDiv = false;
var tijdelijkeVraagId;
var naamStudent;
var SubmittedVraagID;
Template.StudentenPagina.events({
		'click #submitAntwoordOpen': function(e){
			console.log(tijdelijkeVraagId);	
		e.preventDefault();

		var tijdelijkAntwoord = $('#antwoordField').val();
		Meteor.call('AntwoordToevoegen', tijdelijkeVraagId, tijdelijkAntwoord, naamStudent, function(error, res){
		if (error)
			return alert(error.reason);

		if (!res) {
			alert("vraag al ingevoerd");
		}
		SubmittedVraagID = tijdelijkeVraagId;
		});
		

		setTimeout(function(){
 			$("#AntwoordInputDiv").fadeOut(1);
		});
	},
	'click #submitAntwoordMPC': function(e){
		console.log(tijdelijkeVraagId);	
		e.preventDefault();
		var naam = $('#naamInput').val();
	
		var tijdelijkAntwoord = document.querySelector('input[name="multipleChoices"]:checked').value;


		Meteor.call('AntwoordToevoegen', tijdelijkeVraagId, tijdelijkAntwoord, naamStudent, function(error, res){
		if (error)
			return alert(error.reason);
				
		if (!res) {
			alert("vraag al ingevoerd");
		}else{
			SubmittedVraagID = tijdelijkeVraagId;
			Meteor.call('MultipleChoiceChosenToevoegen', tijdelijkAntwoord, tijdelijkeVraagId,  function(error, res){
			if (error)
				return alert(error.reason);
			});
		}

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
		var mp = MultipleChoice.find().fetch();
		
		var vraagobj = Vragen.find({_id: tijdelijkeDbStudentenPagina[0].vraagId}).fetch();
		var textvraag = vraagobj[0].vraagnaam;
		ShowAntwoordInput(tijdelijkeVraagId,textvraag);
		//$('#vraagH2MPC').text(tijdelijkeDbStudentenPagina[0].vraagnaam);

		return MultipleChoice.find({vragenId: tijdelijkeDbStudentenPagina[0].vraagId});


		
	},
	openAntwoord: function(){

		
		var roomCode = window.location.hash.substr(1);
		var tijdelijkeDbStudentenPagina = Lessen.find({roomCode: roomCode}).fetch();
		tijdelijkeVraagId = tijdelijkeDbStudentenPagina[0].vraagId;


		var vraagobj = Vragen.find({_id: tijdelijkeDbStudentenPagina[0].vraagId}).fetch();
		var textvraag = vraagobj[0].vraagnaam;
		ShowAntwoordInput(tijdelijkeVraagId,textvraag);
		if (vraagobj[0].openVraag == true){
			return true;
		}
		else {
			$('#antwoordenCenter').fadeIn(500);
			return false;
		}	
		
	},
	vraagH2: function(){
		return tijdelijkeVraagId[0].vraagId;
	} 

	
});

function showAntwoordInput() {
	$("#NaamInputDiv").fadeOut(500);

	setTimeout(function(){
 		$("#AntwoordInputDiv").fadeIn(500);
 		$(".SubmitButton").fadeIn(500);
	}, 500);
	setDiv = true;
}

function ShowAntwoordInput(tijdelijkeVraagId,textvraag){
	if (tijdelijkeVraagId !== SubmittedVraagID) {

		$('#vraagH2').text(textvraag);
			if (setDiv){

				setTimeout(function(){
	 				$("#AntwoordInputDiv").fadeIn(500);
	 				$(".SubmitButton").fadeIn(500);


				}, 500);
			}
		}
}
