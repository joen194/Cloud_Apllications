
var roomCode;



	Meteor.subscribe('DataMultipleChoice');
	Meteor.subscribe('DataAntwoorden');
//################ Om de juiste roomcode uit de DB te halen #######################
Template.vraagOpBord.helpers({

	vraagnaam : function(){

		roomCode = window.location.hash.substr(1);
		Meteor.subscribe('DataLessenPopup', roomCode);

		var dbLes = Lessen.find().fetch();
		Meteor.subscribe('DataVragen', dbLes[0]._id);
		var vraag= Vragen.find({_id: dbLes[0].vraagId}).fetch();
		return vraag[0].vraagnaam;
	},	Roomcode : function(){

		return window.location.hash.substr(1);;
	},
	antwoordOpBord : function(){
		Meteor.subscribe('DataMultipleChoice');
		Meteor.subscribe('DataAntwoorden');

		roomCode = window.location.hash.substr(1);
		Meteor.subscribe('DataLessenPopup', roomCode);
		var dbLes = Lessen.find().fetch();
		var dbVragen = Vragen.find({ $and: [ { _id: dbLes[0].vraagId }, { visibleAnswer: true } ] }).fetch();	
		var dbAntwoorden = Antwoorden.find().fetch();
		
		return Antwoorden.find({vraagId: dbVragen[0]._id});
	}
});