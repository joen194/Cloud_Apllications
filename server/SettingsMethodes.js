
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';




Meteor.methods({
  getinfo: function(id){
    console.log(Meteor.users.find(id).fetch());
    return Meteor.users.find(id).fetch();
    
  },
  ChangePasswd: function(id, passwd){
    Accounts.setPassword(id, passwd);
    return true;
  },
  ChangeMail: function(id,mail){
    Meteor.users.update(id, {
      $set: {emails: []}
    });
    Accounts.addEmail(id, mail, false);
    return true;
  },

  userUpdate: function (id, doc) {
        // Update account
        console.log(doc);
        doc.Mail =  "[ { 'address' : 'tim.asscherickx@hotmail.com', 'verified' : true } ]";

            Meteor.users.update(id, {
                $set: {profile: {
                  naam: doc.username,
                  achternaam: doc.FamName
                }}
            });

        // Update password
        /*if (doc.password != 'the same') {
            Accounts.setPassword(id, doc.password);
        }*/

        return true;
    },
    userRemove: function (id) {

        Meteor.users.remove(id);
        console.log(id);
        return id;
    }

});