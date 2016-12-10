
Meteor.publish('DataLessen', function(){
	//geeft enkel data van de gebruiker terug 
	return Lessen.find({userId: this.userId})
});

Meteor.publish('DataVragen', function(LesId){
	return Vragen.find({lessenId: LesId})
});

Meteor.publish('DataMultipleChoice', function(tijdelijkVraagId){
	return MultipleChoice.find({vragenId: tijdelijkVraagId});
});
	

Meteor.publish('DataAanwezigen', function(LessenCode) {
	return Aanwezigen.find({roomCode: LessenCode});
});

Meteor.publish('DataAntwoorden', function(IDvraag) {
	return Antwoorden.find({vraagId: IDvraag});
});

Meteor.publish('DataLessenPopup', function(Code){
	//geeft enkel data van de gebruiker terug 
	return Lessen.find({roomCode: Code});
});