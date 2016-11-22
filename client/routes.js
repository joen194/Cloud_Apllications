Router.route('/', function () {
  this.render('StudentenPagina');
});

Router.route('/leerkracht', function () {
  this.render('MainPage');
});

Router.route('/roomCodeLeerkrachten', function() {
	this.render('roomCode');
});