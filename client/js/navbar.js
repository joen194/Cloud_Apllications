Template.SideNavBar.events({
	'click #NavLogout' : function(e){
		Meteor.logout();
	},
	'click #NavLessen' : function(e){
		window.location= "http://localhost:3000/leerkracht";
	},
	'click #NavSettings' : function(e){
		window.location= "http://localhost:3000/leerkracht/settings";
	}
});

Template.SideNavBar.helpers({
  showVraag() {
    return Session.get('showVraag');
  }
});