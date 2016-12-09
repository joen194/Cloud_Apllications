
var roomCode;

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
		roomCode = window.location.hash.substr(1);
		Meteor.subscribe('DataLessenPopup', roomCode);
		var dbLes = Lessen.find().fetch();
		Meteor.subscribe('DataMultipleChoice');
		Meteor.subscribe('DataVragen', dbLes[0]._id);
		var vraagID = Vragen.find({_id: dbLes[0].vraagId}).fetch();
		Meteor.subscribe('DataAntwoorden', vraagID[0]._id);
		if (vraagID[0].visibleAnswer) {
			return Antwoorden.find();
		}

		
		
	}
});