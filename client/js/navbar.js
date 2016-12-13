Template.SideNavBar.events({
	'click #NavLogout' : function(e){
		Meteor.logout();
	},
	'click #NavLessen' : function(e){
		Session.set('showVraag',false);
		Session.set('AlleAntwoorden', false);
	}
});

Template.SideNavBar.helpers({
  showVraag() {
    return Session.get('showVraag');
  }
});