//################ Om de juiste vragen uit de DB te halen #######################

Template.VraagOpBord.helpers({
	historyVraag : function(){
		var tijdelijkId = Session.get('idVanVraag');
		console.log("hierdenid " + tijdelijkId);
		return Vragen.find({_id: tijdelijkId});
	}, 
	historyAnswers : function(){
		var tijdelijkVraagId = Session.get('idVanVraag');
		return Antwoorden.find({vraagId: tijdelijkVraagId});
	}
});
