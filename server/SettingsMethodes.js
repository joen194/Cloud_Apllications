
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';




Meteor.methods({

  userUpdate: function (id, doc) {
        // Update account
        console.log(doc);
        doc.Mail =  "[ { 'address' : 'tim.Asscherickx@hotmail.com', 'verified' : true } ]";

            Meteor.users.update(id, {
                $set: {profile: {
                  name: doc.username,
                  family_name: doc.FamName
                }},
                $set:{
                  emails:doc.Mail
                }
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