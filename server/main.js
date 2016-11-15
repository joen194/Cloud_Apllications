import { Meteor } from 'meteor/meteor';


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


//################## Code voor ReCaptcha #########################

AccountsTemplates.configure({
    reCaptcha: {
        secretKey: 'nope'
    },
});