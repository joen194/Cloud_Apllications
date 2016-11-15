
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
//Template['override-atTitle'].replaces('atTitle');

//ATM werkt het nog niet om van pagina te veranderen
//op deze manier zal het een hel worden dus overschakelen naar iron router



Template.LoginPage.events({
	'click #RegisterBtn' : function(e){
		e.preventDefault();

		Session.set('newRegister', true);
	}
});


Template.LoginPage.helpers({
  newRegister() {
    return Session.get('newRegister');
  }
});


Template.LoginForm.events({


	'click #LoginBtn' : function(events){
		events.preventDefault();
		var emailvar = $('#InputMail').val();
		var passwoordvar = $('#InputPassword').val();

		Meteor.loginWithPassword(emailvar, passwoordvar);
	}
});

