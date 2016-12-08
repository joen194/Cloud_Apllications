

//################ Om de juiste roomcode uit de DB te halen #######################
Template.vraagOpBord.helpers({

	vraagOpBord : function(){
		roomCode = window.location.hash.substr(1);
		console.log(roomCode);
		var db = Lessen.find({roomCode: roomCode}).fetch();
		
		return Vragen.find({_id: db[0].vraagId});
	},
	antwoordOpBord : function(){

		roomCode = window.location.hash.substr(1);
		var db = Lessen.find({roomCode: roomCode}).fetch();
		var dbVragen = Vragen.find({ $and: [ { _id: db[0].vraagId }, { visibleAnswer: true } ] }).fetch();	
		var dbAntwoorden = Antwoorden.find().fetch();
		
		return Antwoorden.find({vraagId: dbVragen[0]._id});
	}
});