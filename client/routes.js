


Router.route('/', function () {
  this.render('enterCode');
});
Router.route('/room', function () {
  this.render('StudentenPagina');
});



Router.onBeforeAction(function(pause) {

    if (! Meteor.user()) {

        this.render('LoginForm');

        //and finally call the pause() to prevent further actions from running
        pause();
    }else{
    	var usergegevens= Meteor.user();
    	if (!('emails' in usergegevens)) {
    		this.next();
    	}else{
    		if (!usergegevens.emails[ 0 ].verified) {
    			this.render('verifyMail');
    		}else{
    			this.next();
    		}

    	}
    }
});



Router.route('/leerkracht', function () {		

	this.render('MainPageLes');
});

Router.route('/leerkracht/vragen', function () {
	this.render('MainPageVragen');
});

Router.route('/leerkracht/vragen/AlleAntwoorden', function () {
  this.render('AntwoordenPage');
});
Router.route('/roomCodeLeerkrachten', function() {
    this.render('vraagOpBord');
});