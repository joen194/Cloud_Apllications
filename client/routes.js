Router.route('/', function () {
  this.render('enterCode');
});
Router.route('/room', function () {
  this.render('StudentenPagina');
});

Router.route('/leerkracht', function () {
  this.render('MainPage');
});
Router.route('/leerkracht/les', function () {
  this.render('MainPage');
});

Router.route('/roomCodeLeerkrachten', function() {
	this.render('vraagOpBord');
});