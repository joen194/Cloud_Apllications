Template.StudentenPagina.events({

		'click #enterRoom' : function(e){
		e.preventDefault();

		Meteor.call('getantwoorden', 'wfAt37MdzNiY4aDsT',function(err, response) {
			if(err) {
				alert(err);
				return;
			}
			console.log('dfdf');
			console.log(response);
			
		});

		


		/*var roomCodeInput = $('#roomCodeField').val();
		console.log(roomCodeInput);

		if(roomCode === roomCodeInput){
			console.log("juiste roomcode " + roomCode);
		}
		else{
			console.log(roomCode);
		}*/
	}
});