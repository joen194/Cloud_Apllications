

Meteor.methods({
	LesToevoegen: function(lesTitel){
		Lessen.insert({
			userId: Meteor.userId(),
			lesnaam: lesTitel
		}, function(error,id){
			console.log(id);
		});
		
	},LesVerwijderen: function(lesTitel){
		Lessen.remove(lesTitel);
		
	}, VraagToevoegen: function(vraagTitel, tijdelijkId) {
		Vragen.insert({
			userId: Meteor.userId(),
			lessenId: tijdelijkId,
			vraagnaam: vraagTitel
		});
	}, VraagVerwijderen: function(vraagTitel) {
		Vragen.remove(vraagTitel);
	}

});	