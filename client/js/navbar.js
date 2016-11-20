Template.SideNavBar.events({
	'click #logout' : function(e){
		Meteor.logout();
	}
});