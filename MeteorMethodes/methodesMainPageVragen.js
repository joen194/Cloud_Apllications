var tijdelijkVraagId;
//############################ methodes om data in db te inserten ##########################
Meteor.methods({
	VraagToevoegen: function(vraagTitel, tijdelijkId, roomCodeLes) {
		Vragen.insert({
			userId: Meteor.userId(),
			lessenId: tijdelijkLesId,
			vraagnaam: vraagTitel
			roomCode: roomCodeLes
		}, function(error,id){
			tijdelijkVraagId = id;
			console.log(id);
		});
	}, 

	VraagVerwijderen: function(vraagId) {
		Vragen.remove(vraagId);
		Antwoorden.remove({vragenId:vraagId});
	},

	AntwoordToevoegen: function(antwoordInput, tijdelijkVraagId){
		Antwoorden.insert({
			userId: Meteor.userId(),
			vragenId: tijdelijkVraagId,
			antwoord: antwoordInput
		});
	}
});	