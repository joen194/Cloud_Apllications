Meteor.methods({
	LesToevoegen: function(lesTitel, randomCode){

		Lessen.insert({
			userId: Meteor.userId(),
			lesnaam: lesTitel,
			roomCode: randomCode,
			vraagId: null
		});
	},
	InsertRoomCode : function(randomCode){
		RoomCode.insert({
			roomCode : randomCode
		});
	},
	LesVerwijderen: function(lesId){
		Lessen.remove(lesId);
		Vragen.remove({lessenId: lesId});
		MultipleChoice.remove({lesId: lesId});
		Antwoorden.remove({lessenId: lesId});
		
	},
	LessenAanpassen: function(lesInput, lesId) {
		Lessen.update({_id: lesId}, {$set:{lesnaam: lesInput}});
	},

	GetRoomCode: function(LesId) {
		
	}
});	