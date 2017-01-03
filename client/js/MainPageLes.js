
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
	},
	LesVerwijderen:function(){
		return Session.get('popUpLesVerwijderen');
	},
});



//##################### Om lessen te verwijderen en te bekijken ##########################

var editDeletePress = null;


Template.OverzichtLessen.events({
	'click #editLes' : function(e){
		e.preventDefault();
		if(editDeletePress===null){
			editDeletePress=this._id;
		}else{
			setTimeout(function(){
 				editDeletePress = null;
			},0);
			
		}
		
		$('#h1' + this._id).toggle();
		$('#div' + this._id).toggle();	
	},
	'click #deleteLes': function(e){
		e.preventDefault();
		editDeletePress=this._id;
		Session.set('tijdelijkeLesIdDelete', this._id);
		$("#tijdelijkeTitelLes").text("Wilt u deze les verwijderen?");
		Session.set('popUpLesVerwijderen', true);				
	},
	'click #lessen' : function(e){
		e.preventDefault();
		if (editDeletePress !== this._id) {
			Session.set('showVraag', true);
			var tijdelijkLesId = this._id;
			Session.set('tijdelijkIdSession', tijdelijkLesId);
			var db = Lessen.find({_id: this._id}).fetch();
			Session.set('getRoomCode', db[0].roomCode);
		}

	},
	'click #saveLes': function(e){
		e.preventDefault();
		setTimeout(function(){
 			editDeletePress = null;
		},0);
		var lesInput = $('#input' + this._id).val();
		Meteor.call('LessenAanpassen',lesInput, this._id, function(error,id) {
			if (error)
				return alert(error.reason);
		});
		$('#h1' + this._id).toggle();
		$('#div' + this._id).toggle();
	},
	'click #jaLes': function(e){
		e.preventDefault();

		if ($("#tijdelijkeTitelLes").text() == "Wilt u deze les verwijderen?" ) {
			t = Session.get('tijdelijkeLesIdDelete');
			Meteor.call('LesVerwijderen', t, function(error, id){
				if (error)
					return alert(error.reason);
			});
		}
	},

	'click #neeLes': function(e){
		e.preventDefault();
		editDeletePress = null;	
	},
});