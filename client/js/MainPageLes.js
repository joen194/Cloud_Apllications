
//###################### Om een les aan te maken ###########################

Template.MainPageLes.events({
	'click #addLes' : function(e){
		e.preventDefault();

		var lesTitel = $('#TitelLes').val();
		var idpinboard = makeid();
		Meteor.call('LesToevoegen', lesTitel, idpinboard, function(error, id){
		if (error)
			return alert(error.reason);
		});
		Session.set('getRoomCode', idpinboard);
		console.log("hier is de room " + idpinboard);
	}
});

//#################### Om een random code te genereren ####################
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}

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
	'click #viewLes' : function(e){
		e.preventDefault();

		Session.set('showVraag', true);
		var tijdelijkLesId = this._id;
		Session.set('tijdelijkIdSession', tijdelijkLesId);
		var db = Lessen.find({_id: this._id}).fetch();
		Session.set('getRoomCode', db[0].roomCode);
		
	},
	'click #editLes' : function(e){
		e.preventDefault();
		
		$('#div' + this._id).toggle();	
	},
	'click #deleteLes': function(e){
		e.preventDefault();
		
		Meteor.call('LesVerwijderen', this._id, function(error, id){
		if (error)
			return alert(error.reason);
		});
	},
	'click #saveLessen': function(e) {
		e.preventDefault();

		var lesInput = $('#input' + this._id).val();
		Meteor.call('LessenAanpassen',lesInput, this._id, function(error,id) {
			if (error)
				return alert(error.reason);
		});
		$('#div' + this._id).toggle();
	}	
});