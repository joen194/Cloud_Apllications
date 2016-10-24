var tijdelijkVraagId;
//############################ methodes om data in db te inserten ##########################
Meteor.methods({
	VraagToevoegen: function(vraagTitel, tijdelijkId) {
		Vragen.insert({
			userId: Meteor.userId(),
			lessenId: tijdelijkId,
			vraagnaam: vraagTitel
		}, function(error,id){
			tijdelijkVraagId = id;
			console.log(id);
		});
		Session.set('tijdelijkVraagId', tijdelijkVraagId);
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