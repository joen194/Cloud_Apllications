
//######## code om de layout van de login button te overschrijven ########
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');




//######################## code voor recaptcha ###########################

AccountsTemplates.configure({
	reCaptcha: {
        siteKey: "6LcKBwwUAAAAAJA4Dk9i95lsurU8VngCNbe21DnC",
        theme: "light",
        data_type: "image"
    },
    showReCaptcha: true,
    sendVerificationEmail: true	

});

//########### Code om extra velden toe te voegen in register form #######

//zet de taal van de register forum in het nederlands
T9n.setLanguage('nl');

AccountsTemplates.addFields([
	{
		errStr: 'vul een naam in',
		_id: 'naam',
		type: 'text',
		displayName: 'Voornaam',
		required: true,
		re: /(?=.*[a-z])/
    	
	},{

    	errStr: 'vul een achternaam in',
		_id: 'achternaam',
		type: 'text',
		displayName: 'Achternaam',
		required: true,
		re: /(?=.*[a-z])/
	},{
		_id:'geslacht',
		type:'select',
		displayName:'geslacht',
		select:[
			{
				text:'Man',
				value:'man'
			},{
				text:'Vrouw',
				value:'vrouw'
			}
		]

	}
]);


