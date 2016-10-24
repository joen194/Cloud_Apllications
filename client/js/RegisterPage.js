Template.RegisterPage.events({
	'click #BackBtn' : function(e){
		e.preventDefault();

		Session.set('newRegister', false);
	},
	'submit form' : function(events, template){
		events.preventDefault();
		var naamvar = $('#NaamInput').val();
		var AchterNaamvar = $('#AchternaamInput').val();
		var emailvar = $('#MailInput').val();
		var passwoordvar = $('#PasswoordInput').val();

		Accounts.createUser({
			email: emailvar,
			password: passwoordvar

		})
	}
});