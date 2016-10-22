

//ATM werkt het nog niet om van pagina te veranderen
//op deze manier zal het een hel worden dus overschakelen naar iron router



Template.LoginPage.events({
	'click #RegisterBtn' : function(e){
		e.preventDefault();

		Session.set('newRegister', true);
	}
});


Template.LoginPage.helpers({
	'newRegister' : function () {

	}
});


  Template.LoginPage.helpers({
    newRegister() {
      return Session.get('newRegister');
    }
  });