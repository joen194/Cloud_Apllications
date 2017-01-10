
Template.SettingsPage.events({
    'click #RemoveUser': function(e){
        console.log(Meteor.userId());
        Meteor.call('userRemove',Meteor.userId(), function(error, id){
        if (error)
            return alert(error.reason);
        });
    },
    'click #SaveSettings': function(e){
        var doc= {};
        doc.FamName = $('#AchternaamInputSettings').val();
        doc.username = $('#NaamInputSettings').val();
         Meteor.call('userUpdate',Meteor.userId(),doc, function(error, id){
        if (error)
            return alert(error.reason);
        });
    },
    'click #MailSettings': function(e){

        var mail = $('#MailInputSettings').val();
         Meteor.call('ChangeMail',Meteor.userId(),mail, function(error, id){
        if (error)
            return alert(error.reason);
        });
    },
    'click #PassSettings': function(e){

        var pass1 = $('#PassInputSettings').val();
        var pass2 = $('#PassInputSettings2').val();
        if (pass1 === pass2) {
             Meteor.call('ChangePasswd',Meteor.userId(),pass1, function(error, id){
            if (error)
                return alert(error.reason);
            });
        }
    },
    'click #dropdownimg1': function(e){
        //$("#dropdownimg1").rotate(180);
        Meteor.myFunctions.DropDownMenu("dropdowndiv1","dropdownimg1");
    }



});