
//###################### Om een les aan te maken ###########################

Template.MainPageLes.events({
	'click #addLes' : function(e){
		e.preventDefault();

		var lesTitel = $('#TitelLes').val();

		Lessen.insert({
			userId: Meteor.userId(),
			lesnaam: lesTitel
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
		console.log("in delete functie");
		Lessen.remove(this._id);
	}
})