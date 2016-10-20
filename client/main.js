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

Template.OverzichtLessen.events({
	'click #addLes' : function(e){
		e.preventDefault();

		var lesTitel = template.find('#TitelLes').value;

		Lessen.insert({
			lesnaam: lesTitel
		});
		OverzichtLessen.update(Lessen);
	}
});