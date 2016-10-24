Template.RegisterPage.events({
	'click #BackBtn' : function(e){
		e.preventDefault();

		Session.set('newRegister', false);
	}
});