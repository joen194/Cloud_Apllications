Meteor.methods({
	LesToevoegen: function(lesTitel, randomCode){

		Lessen.insert({
			userId: Meteor.userId(),
			lesnaam: lesTitel,
			roomCode: randomCode
		});
	},
	InsertRoomCode : function(randomCode){
		RoomCode.insert({
			roomCode : randomCode
		});
	},
	LesVerwijderen: function(lesTitel){
		Lessen.remove(lesTitel);
		
	},
	LessenAanpassen: function(lesInput, lesId) {
		Lessen.update({_id: lesId}, {$set:{lesnaam: lesInput}});
	},

	GetRoomCode: function(LesId) {
		
	}
});	