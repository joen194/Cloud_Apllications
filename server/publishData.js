
Meteor.publish('DataLessen', function(){
	//geeft enkel data van de gebruiker terug 
	return Lessen.find({userId: this.userId})
});

Meteor.publish('DataVragen', function(LesId){
	return Vragen.find({lessenId: LesId})
});

Meteor.publish('DataMultipleChoice', function(){
	return MultipleChoice.find({userId: this.userId});
});
	

Meteor.publish('DataAanwezigen', function(LessenCode) {
	return Aanwezigen.find({roomCode: LessenCode});
});

Meteor.publish('DataAntwoorden', function() {
	return Antwoorden.find();
});

Meteor.publish('DataLessenPopup', function(Code){
	//geeft enkel data van de gebruiker terug 
	return Lessen.find({roomCode: Code});
});