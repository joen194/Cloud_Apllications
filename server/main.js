import { Meteor } from 'meteor/meteor';



Meteor.methods({

	getantwoorden: function(azerty) {
	      
	      var antwoord = vragen.find({lessenId: azerty});

	      console.log(antwoord);
	      return antwoord;

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


