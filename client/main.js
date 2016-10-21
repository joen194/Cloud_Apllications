//   <!-- angular dependencies -->
//import angular from 'angular';

//    <!-- application code -->
import './js/app.js';

import './css/style.css';
import './css/bootstrap.min.css';
import './main.html';

Template.OverzichtLessen.helpers({
	historyLes: function(){
		return Lessen.find();
		//console.log("erin");
	}
});

Template.MainPageLes.events({
	'click #addLes' : function(e){
		e.preventDefault();

		var lesTitel = $('#TitelLes').val();
		console.log("qnjfk");
		Lessen.insert({
			userId: Meteor.userId(),
			lesnaam: lesTitel
		});

	}


});
Template.OverzichtLessen.events({
		'click #deleteLes': function(e){
		console.log("in delete functie");
		Lessen.remove(this._id);
	}
})
