Meteor.methods({
	LesToevoegen: function(lesTitel){
		Lessen.insert({
			userId: Meteor.userId(),
			lesnaam: lesTitel
		});
		
	},
	LesVerwijderen: function(lesTitel){
		Lessen.remove(lesTitel);
		
	}
});	