

//################## Om te abonneren op de lessen data #####################
Meteor.subscribe('DataLessen');

//###################### Om een les aan te maken ###########################

Template.MainPageLes.events({
	'click #addLes' : function(e){
		e.preventDefault();

		var lesTitel = $('#TitelLes').val();

		Meteor.call('LesToevoegen', lesTitel, function(error, id){
		if (error)
			return alert(error.reason);
		});

	}
});

/*Template.OverzichtLessen.onCreated(function(){
  this.ShowVragen = new ReactiveVar(false);
});*/

//################ Om de lessen uit de DB te halen #######################

Template.OverzichtLessen.helpers({
	historyLes: function(){
		return Lessen.find();
	}
});



//##################### Om lessen te verwijderen en te bekijken ##########################

Template.OverzichtLessen.events({
	/*'click #viewLes' : function(event, template){
		template.ShowVragen.set(true);
	}*/

	'click #deleteLes': function(e){
		e.preventDefault();
		
		Meteor.call('LesVerwijderen', this._id, function(error, id){
		if (error)
			return alert(error.reason);
		});
	}

	
});