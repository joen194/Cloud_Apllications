

Template.MainPage.events({
	'click .resend-verification-link' : function(e){
		console.log(Meteor.userId());
		var userid = Meteor.userId();
	    Meteor.call( 'sendVerificationLink', userid, ( error, response ) => {
	      if ( error ) {
	        Bert.alert( error.reason, 'danger' );
	      } else {
	        let email = Meteor.user().emails[ 0 ].address;
	        Bert.alert( `Verification sent to ${ email }!`, 'success' );
	      }
	    });
	  }
});

Template.MainPage.helpers({
  verify(){

		var usergegevens= Meteor.user();
		if (!('emails' in usergegevens)) {
			return true;
		}else{
			return usergegevens.emails[ 0 ].verified;
		}
	 	return false;

	},
	showVraag() {
	    //return Session.get('showVraag');
	    return $.cookie('showVraag');
	},
	AlleAntwoorden() {
		return $.cookie('AlleAntwoorden');
		//return Session.get("AlleAntwoorden");
	}
	
});
Template.MainPage.helpers({
  showVraagOpBord() {
    return Session.get('showVraagOpBord');
  }
});
