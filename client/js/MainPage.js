

Template.MainPage.events({
	'click #viewLes' : function(e){
		e.preventDefault();

		Session.set('showVraag', true);
		var tijdelijkLesId = this._id;
		Session.set('tijdelijkIdSession', tijdelijkLesId);
		console.log(tijdelijkLesId);
		
	},
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

	var usergegevens= Meteor.user().emails;
	if (usergegevens === undefined) {
		return true;
	}else{
		return usergegevens[ 0 ].verified;
	}
 	return false;

 },showVraag() {
    return Session.get('showVraag');
  }
});
Template.MainPage.helpers({
  showVraagOpBord() {
    return Session.get('showVraagOpBord');
  }
});
