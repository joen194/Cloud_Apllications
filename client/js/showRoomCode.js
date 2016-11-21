//################ Om de juiste roomcode uit de DB te halen #######################

Template.roomCode.helpers({
	roomCodeHistory : function(){
		var tijdelijkId = Session.get('tijdelijkIdSession');
		console.log("hierdenid " + tijdelijkId);


		return Lessen.find({_id: tijdelijkId});
	}
});