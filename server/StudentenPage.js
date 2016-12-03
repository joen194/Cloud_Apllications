import { Meteor } from 'meteor/meteor';



Meteor.methods({
	getRoomcode: function(code) {

	    var checkroomcode = {};
	    checkroomcode = Lessen.find({"roomCode" : code}).fetch();
	    console.log(checkroomcode);

	    if (checkroomcode.length > 0) {

		    var result = {};
		    result.lesnaam= checkroomcode[0].lesnaam;
		    result.roomCode=checkroomcode[0].roomCode;
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

	NaamInDatabase: function(naam, clientId) {
		Aanwezigen.insert({
			naam: naam,
			clientId: clientId,
			roomCode: kamerCode
		});
	}
});

Meteor.onConnection(function (connection) {
    connection.onClose(function() {
    	Aanwezigen.remove({clientId: connection.id});
    });
});







