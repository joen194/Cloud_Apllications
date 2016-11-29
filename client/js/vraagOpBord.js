Meteor.subscribe('DataVragen');
Meteor.subscribe('DataMultipleChoice');

var vragenId;

//################ Om de juiste roomcode uit de DB te halen #######################
Template.vraagOpBord.helpers({

	vraagOpBord : function(){
		vragenId = window.location.hash.substr(1);
		console.log(vragenId);
		console.log("hierdenid " + vragenId);

		return Vragen.find({_id: vragenId});
	}
});