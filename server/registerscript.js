
import { Accounts } from 'meteor/accounts-base';

//################## Code voor ReCaptcha #########################

AccountsTemplates.configure({
    reCaptcha: {
        secretKey: '6LcKBwwUAAAAAHReVsve4JiKyNfohiiY8Ie4B5mU'
    },
});



//################## Code voor verificatie email ################

Accounts.onCreateUser(function(options, user) {
    user.profile = {};

    // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() {
        Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);

    return user;
});

//################## Mail Settings ###############################
    // 1. Set up stmp
    var username = 'student.interactor@outlook.be';
    var password = 'CloudApplications';
    var server = 'smtp-mail.outlook.com';
    var port = '587';

    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(username) + ':' +
        encodeURIComponent(password) + '@' +
        encodeURIComponent(server) + ':' + port;

    // 2. Format the email
    //-- Set the from address
    Accounts.emailTemplates.from = 'student.interactor@outlook.be';

    //-- Application name
    Accounts.emailTemplates.siteName = 'Student interactor';

    //-- Subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Bevestig je email voor Student interactor';
    };

    //-- Email text
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
       // var newUrl = url.replace('/#','');
        return 'Bedankt om te registreren.  Klik op deze link om u registratie af te ronden \r\n' + url;
    };