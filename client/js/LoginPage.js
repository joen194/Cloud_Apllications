
//######## code om de layout van de login button te overschrijven ########
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');




//######################## code voor recaptcha ###########################

AccountsTemplates.configure({
	reCaptcha: {
        siteKey: "nope",
        theme: "light",
        data_type: "image"
    },
    showReCaptcha: true	

});

//########### Code om extra velden toe te voegen in register form #######

//zet de taal van de register forum in het nederlands
T9n.setLanguage('nl');

AccountsTemplates.addFields([
	{
		_id: 'firstname',
		type: 'text',
		displayName: 'First Name',
		required: true,
		re: /(?=.*[a-z])/,
    	errStr: 'vul een naam in'
	},{
		_id: 'Lastname',
		type: 'text',
		displayName: 'Last Name',
		required: true,
		re: /(?=.*[a-z])/,
    	errStr: 'vul een achternaam in'
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


