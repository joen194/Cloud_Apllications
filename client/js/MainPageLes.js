

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

//################ Om een lessen uit de DB te halen #######################

Template.OverzichtLessen.helpers({
	historyLes: function(){
		return Lessen.find();
	}
});

//##################### Om lessen te verwijderen ##########################

Template.OverzichtLessen.events({
	'click #deleteLes': function(e){
		Meteor.call('LesVerwijderen', this._id, function(error, id){
		if (error)
			return alert(error.reason);
		});
	}
})