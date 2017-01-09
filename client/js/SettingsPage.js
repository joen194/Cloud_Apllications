
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
        var Main = $('#MailInputSettings').val();
        doc.FamName = $('#AchternaamInputSettings').val();
        doc.username = $('#NaamInputSettings').val();
         Meteor.call('userUpdate',Meteor.userId(),doc, function(error, id){
        if (error)
            return alert(error.reason);
        });
    }

});