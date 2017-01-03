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
			lesId: lesId,
			timesChosen: 0
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

	MultipleChoiceChosenToevoegen: function(multipleChoiceNaam, ophalenInputsId){
		var mp = MultipleChoice.find( { $and: [ { lesId: ophalenInputsId}, { multipleChoice: multipleChoiceNaam}]}).fetch();
		var getThaInt = mp[0].timesChosen;
		var getThaInt = 1 + getThaInt ;
		console.log(getThaInt);
		//MultipleChoice.update({_id: ophalenInputsId}, {$set:{timesChosen: multipleChoicePlusOne}});
		MultipleChoice.update( { $and: [ { lesId: ophalenInputsId}, { multipleChoice: multipleChoiceNaam}]}, {$set:{timesChosen: getThaInt}});
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