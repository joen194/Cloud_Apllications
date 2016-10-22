/*

ATM werkt het nog niet om van pagina te veranderen
op deze manier zal het een hel worden dus overschakelen naar iron router


Template.LoginPage.events({
	'click #RegisterBtn' : function(e){
		e.preventDefault();
		test = false;
		console.log(test);
	},
	'newRegister' : function () {
		return test;
	}
});
*/
var test = true;
Template.LoginPage.helpers({
	'newRegister' : function () {
		return test;
	}
});