var tijdelijkVraagId;
//############################ methodes om data in db te inserten ##########################
Meteor.methods({
	VraagToevoegen: function(vraagTitel, tijdelijkLesId, roomCodeLes) {
		Vragen.insert({
			userId: Meteor.userId(),
			lessenId: tijdelijkLesId,
			vraagnaam: vraagTitel,
			roomCode: roomCodeLes
		}, function(error,id){
			tijdelijkVraagId = id;
			Session.set('tijdelijkVraagId',tijdelijkVraagId);
		});
	}, 

	VraagVerwijderen: function(vraagId) {
		Vragen.remove(vraagId);
		MultipleChoice.remove({vragenId:vraagId});
	},

	MultipleChoiceToevoegen: function(multipleChoiceInput, tijdelijkVraagId){
		MultipleChoice.insert({
			userId: Meteor.userId(),
			vragenId: tijdelijkVraagId,
			multipleChoice: multipleChoiceInput
		});
	},

	VraagAanpassen: function(titelAanpassen, vraagId){
		Vragen.update({_id: vraagId}, {$set:{vraagnaam: titelAanpassen}});
	},

	MultipleChoiceAanpassen: function(multipleChoiceAanpassen,ophalenInputsId){
		MultipleChoice.update({_id: ophalenInputsId}, {$set:{antwoord: multipleChoiceAanpassen}});
	}
});	