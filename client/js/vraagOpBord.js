

//################ Om de juiste roomcode uit de DB te halen #######################
Template.vraagOpBord.helpers({

	vraagOpBord : function(){
		roomCode = window.location.hash.substr(1);
		var db = Lessen.find({roomCode: roomCode}).fetch();
		
		return Vragen.find({_id: db[0].vraagId});
	}
});