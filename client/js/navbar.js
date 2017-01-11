Template.SideNavBar.events({
	'click #NavLogout' : function(e){
		Meteor.logout();
	},
	'click #NavLessen' : function(e){
		window.location= Meteor.absoluteUrl()+"leerkracht";
	},
	'click #NavSettings' : function(e){
		window.location= Meteor.absoluteUrl()+"leerkracht/settings";
	},
	'click #NavInfo' : function(e){
		window.location= Meteor.absoluteUrl()+"leerkracht/info";
	}
});

Template.SideNavBar.helpers({
  showVraag() {
    return Session.get('showVraag');
  }
});