Template.StudentenPagina.events({

		'click #enterRoom' : function(e){
		e.preventDefault();

		var roomCodeInput = $('#roomCodeField').val();

		Meteor.call('getRoomcode', roomCodeInput ,function(err, response) {
			if(err) {
				alert(err);
				return;
			}
			console.log(response);
			
		});

	}
});