Template.StudentenPagina.events({

		'click #enterRoom' : function(e){
		e.preventDefault();

		var roomCodeInput = $('#roomCodeField').val();
		console.log(roomCodeInput);
		var roomCode = Session.get('getRoomCode');
		if(roomCode === roomCodeInput){
			console.log("juiste roomcode " + roomCode);
		}
		else{
			console.log(roomCode);
		}
	}
});