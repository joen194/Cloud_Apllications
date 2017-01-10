Meteor.myFunctions = {

    DeleteAllMPC : function(vraagID) { 
    	Meteor.call('AllMPCVerwijderen',vraagID, function(error,id) {
			if (error)
				return alert(error.reason);
		});
     },
     DeleteMPC : function(id){
     	Meteor.call('MultipleChoiceVerwijderen', id, function(error,id) {
			if (error)
				return alert(error.reason);
		});
     },
     DropDownMenu: function(idDiv, idImg){

     	$("#"+idDiv).toggle(0);
     }

		

}