
Meteor.publish('DataLessen', function(){
	//geeft enkel data van de gebruiker terug 
	return Lessen.find({userId: this.userId})
});

Meteor.publish('DataVragen', function(){
	return Vragen.find({userId: this.userId})
});

Meteor.publish('DataAntwoorden', function(){
	return Antwoorden.find({userId: this.userId});
});