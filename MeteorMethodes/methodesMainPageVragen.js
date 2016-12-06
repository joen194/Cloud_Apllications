var tijdelijkVraagId;
//############################ methodes om data in db te inserten ##########################
Meteor.methods({
	VraagToevoegen: function(vraagTitel, tijdelijkLesId, roomCodeLes) {
		return Vragen.insert({
			userId: Meteor.userId(),
			lessenId: tijdelijkLesId,
			vraagnaam: vraagTitel,
			roomCode: roomCodeLes,
			openVraag: true
		}, function(error,id){
			return id;
		});
	}, 

	VraagVerwijderen: function(vraagId) {
		Vragen.remove(vraagId);
		MultipleChoice.remove({vragenId:vraagId});
	},

	OpenVraag: function(vraagId){
		Vragen.update({_id: vraagId}, {$set:{openVraag: true}});

	},

	MultipleChoiceToevoegen: function(multipleChoiceInput, tijdelijkVraagId, lesId){
		MultipleChoice.insert({
			userId: Meteor.userId(),
			vragenId: tijdelijkVraagId,
			lessenId: lesId,
			multipleChoice: multipleChoiceInput
		});
	},

	VraagAanpassen: function(titelAanpassen, vraagId){
		Vragen.update({_id: vraagId}, {$set:{vraagnaam: titelAanpassen}});
	},

	MultipleChoiceAanpassen: function(multipleChoiceAanpassen,ophalenInputsId){
		MultipleChoice.update({_id: ophalenInputsId}, {$set:{multipleChoice: multipleChoiceAanpassen}});
	},

	MultipleChoiceVerwijderen: function(id) {
		MultipleChoice.remove(id);
	},

	multipleChoiceIdOpvragen: function(id) {
		MultipleChoice.find({vragenId: id});

	},

	VraagIdAanpassen : function(lessenId, vraagId) {
		Lessen.update({_id: lessenId},{$set:{vraagId: vraagId}});
	}
});	