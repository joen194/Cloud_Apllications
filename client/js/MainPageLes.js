

//################## Om te abonneren op de lessen data #####################
Meteor.subscribe('DataLessen');

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