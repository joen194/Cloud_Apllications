import { Meteor } from 'meteor/meteor';



Meteor.methods({
	getRoomcode: function(code) {

	    var checkroomcode = {};
	    checkroomcode = Lessen.find({"roomCode" : code}).fetch();


	    if (checkroomcode.length > 0) {

		    var result = {};
		    result.lesnaam= checkroomcode[0].lesnaam;
		    result.roomCode=checkroomcode[0].roomCode;
		    result.lesID = checkroomcode[0]._id
		    return result;
	    }
	    else{
	    	return false;
	    } 
	},

	AntwoordToevoegen: function(tijdelijkeVraagId, tijdelijkAntwoord, tijdelijkeNaam_leerling, lesID) {
		var checkAntwoord = Antwoorden.find({ $and: [{ vraagId: tijdelijkeVraagId},{ naamLeerling: tijdelijkeNaam_leerling}]}).fetch();
		console.log(checkAntwoord.length);
		if (checkAntwoord.length > 0) {
			return false;
		}else{

			Antwoorden.insert({
				vraagId: tijdelijkeVraagId,
				Antwoord: tijdelijkAntwoord,
				naamLeerling: tijdelijkeNaam_leerling,
				lessenId: lesID
			});
			return true;
		}
	},

	NaamInDatabase: function(Naam, clientId, kamerCode) {
		checkname = Aanwezigen.find({$and:[{"naam" : Naam},{ roomCode: kamerCode}]}).fetch();
		if (checkname.length > 0) {
			return false;  
	    }
	    else{
	    	Aanwezigen.insert({
				naam: Naam,
				clientId: clientId,
				roomCode: kamerCode
			});
			return true;
	    } 

	},
	MultipleChoiceChosenToevoegen: function(multipleChoiceNaam, VraagID){
		console.log(multipleChoiceNaam +  " en " +VraagID );
		var mp = MultipleChoice.find( { $and: [ { vragenId: VraagID}, { multipleChoice: multipleChoiceNaam}]}).fetch();
		var getThaInt = mp[0].timesChosen;
		var getThaInt = 1 + getThaInt ;
		console.log(getThaInt);
		//MultipleChoice.update({_id: ophalenInputsId}, {$set:{timesChosen: multipleChoicePlusOne}});
		MultipleChoice.update( { $and: [ { vragenId: VraagID}, { multipleChoice: multipleChoiceNaam}]}, {$set:{timesChosen: getThaInt}});
	}
});

Meteor.onConnection(function (connection) {
    connection.onClose(function() {
    	Aanwezigen.remove({clientId: connection.id});
    });
});







