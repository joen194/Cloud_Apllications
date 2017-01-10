var rotate1= false;
var rotate2= false;
var rotate3= false;
Template.SettingsPage.events({
    'click #RemoveUser': function(e){
        console.log(Meteor.userId());
        Meteor.call('userRemove',Meteor.userId(), function(error, res){
        if (error)
            return alert(error.reason);
        if(res)
            return alert("Gebruiker verwijderd");
        });
    },
    'click #SaveSettings': function(e){
        var doc= {};
        doc.FamName = $('#AchternaamInputSettings').val();
        doc.username = $('#NaamInputSettings').val();
         Meteor.call('userUpdate',Meteor.userId(),doc, function(error, res){
        if (error)
            return alert(error.reason);
        if (res)
            return alert("Naam Veranderd");
        });
    },
    'click #MailSettings': function(e){

        var mail = $('#MailInputSettings').val();
         Meteor.call('ChangeMail',Meteor.userId(),mail, function(error, res){
        if (error)
            return alert(error.reason);
        if(res)
            return alert("Mail Veranderd");
        });
    },
    'click #PassSettings': function(e){

        var pass1 = $('#PassInputSettings').val();
        var pass2 = $('#PassInputSettings2').val();
        if (pass1 === pass2) {
             Meteor.call('ChangePasswd',Meteor.userId(),pass1, function(error, res){
            if (error)
                return alert(error.reason);
            if(res)
            return alert("Paswoord aangepast");
            });
        }
    },
    'click #dropdownimg1': function(e){
        if (rotate1) {
           $("#dropdownimg1").rotate(0); 
           rotate1=false;
       }else{
            $("#dropdownimg1").rotate(180); 
            rotate1 =true;
       }   
        Meteor.myFunctions.DropDownMenu("dropdowndiv1","dropdownimg1");
    },
    'click #dropdownimg2': function(e){
        if (rotate2) {
           $("#dropdownimg2").rotate(0); 
           rotate2=false;
       }else{
            $("#dropdownimg2").rotate(180); 
            rotate2 =true;
       }   
        Meteor.myFunctions.DropDownMenu("dropdowndiv2","dropdownimg2");
    },
    'click #dropdownimg3': function(e){
        if (rotate3) {
           $("#dropdownimg3").rotate(0); 
           rotate3=false;
       }else{
            $("#dropdownimg3").rotate(180); 
            rotate3 =true;
       }   
        Meteor.myFunctions.DropDownMenu("dropdowndiv3","dropdownimg3");
    }



});
