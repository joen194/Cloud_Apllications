Template.enterCode.events({
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
			if (!Lesinfo) {
				window.alert("invalid roomcode");
				return;
			}else{
				window.location= "http://localhost:3000/room#"+Lesinfo.roomCode;
			}
		});

	}
});