

Template.MainPage.events({
	'click #viewLes' : function(e){
		e.preventDefault();

		Session.set('showVraag', true);
		var tijdelijkLesId = this._id;
		Session.set('tijdelijkIdSession', tijdelijkLesId);
		console.log(tijdelijkLesId);
		
	}
});

Template.MainPage.helpers({
  showVraag() {
    return Session.get('showVraag');
  }
});
Template.MainPage.helpers({
  showVraagOpBord() {
    return Session.get('showVraagOpBord');
  }
});
