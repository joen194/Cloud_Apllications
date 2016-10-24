//   <!-- angular dependencies -->
//import angular from 'angular';

//    <!-- application code -->


import './css/style.css';
import './css/bootstrap.min.css';
import './main.html';


Template.body.events({
	'click #viewLes' : function(e){
		e.preventDefault();

		Session.set('showVraag', true);
		var tijdelijkId = this._id;
		Session.set('tijdelijkIdSession', tijdelijkId);		
	}
});

Template.body.helpers({
  showVraag() {
    return Session.get('showVraag');
  }
});




