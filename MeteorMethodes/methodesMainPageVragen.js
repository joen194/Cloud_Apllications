var tijdelijkVraagId;
//############################ methodes om data in db te inserten ##########################
Meteor.methods({
	VraagToevoegen: function(vraagTitel, tijdelijkLesId, roomCodeLes) {
		return Vragen.insert({
			lessenId: tijdelijkLesId,
			vraagnaam: vraagTitel,
			openVraag: true,
			visibleAnswer: false
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
	Meerkeuzevraag: function(vraagId){
		Vragen.update({_id: vraagId}, {$set:{openVraag: false}});

	},

	MultipleChoiceToevoegen: function(multipleChoiceInput, tijdelijkVraagId, lesId){
		return MultipleChoice.insert({
			vragenId: tijdelijkVraagId,
			multipleChoice: multipleChoiceInput,
			lesId: lesId
		}, function(error,id){
			return id;
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
	AllMPCVerwijderen: function(id) {
		MultipleChoice.remove({vragenId: id});
	},

	VraagIdAanpassen : function(lessenId, vraagId) {
		Lessen.update({_id: lessenId},{$set:{vraagId: vraagId}});
	},
	AntwoordZichtbaarheid : function( visibilityAnswer, vraagId){
		Vragen.update({_id: vraagId},{$set:{visibleAnswer: visibilityAnswer}});
	}
});	