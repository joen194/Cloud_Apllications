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

	AntwoordToevoegen: function(tijdelijkeVraagId, tijdelijkAntwoord, tijdelijkeNaam_leerling) {
		Antwoorden.insert({
			vraagId: tijdelijkeVraagId,
			Antwoord: tijdelijkAntwoord,
			naamLeerling: tijdelijkeNaam_leerling
		});
	},

	NaamInDatabase: function(Naam, clientId, kamerCode) {
		checkname = Aanwezigen.find({"naam" : Naam}).fetch();
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

	}
});

Meteor.onConnection(function (connection) {
    connection.onClose(function() {
    	Aanwezigen.remove({clientId: connection.id});
    });
});







