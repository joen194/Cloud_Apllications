

Template.verifyMail.events({
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
	  },
	  'click .logoutLink' : function(e){
	  	Meteor.logout();
	  }
});

Template.MainPage.helpers({
  showVraagOpBord() {
    return Session.get('showVraagOpBord');
  }
});
