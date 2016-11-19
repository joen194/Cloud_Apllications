import { Meteor } from 'meteor/meteor';



Meteor.methods({



	getRoomcode: function(code) {
	      
	    var checkroomcode = Lessen.find({"roomCode" : code}).fetch();
	    if (checkroomcode.lesnaam !== undefined) {
	    	console.log(checkroomcode[0]);

		    var result = {};
		    result.lesnaam= checkroomcode[0].lesnaam;
		    result.roomCode=checkroomcode[0].roomCode;
		    return result;
	    }
	    else{
	    	return false;
	    }
	    
	}


});

Meteor.startup(() => {
  // code to run on server at startup
  /*if (Lessen.find().count()===0) {
  	Lessen.insert({
  		lesnaam: 'les x'
  	});
  	Lessen.insert({
  		lesnaam: 'les x2'
  	});
  };*/


});


