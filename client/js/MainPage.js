

Template.MainPage.events({
	'click #viewLes' : function(e){
		e.preventDefault();

		Session.set('showVraag', true);
		var tijdelijkId = this._id;
		Session.set('tijdelijkIdSession', tijdelijkId);
		console.log(tijdelijkId);
		
	}
});

Template.MainPage.helpers({
  showVraag() {
    return Session.get('showVraag');
  }
});
