
Meteor.publish('DataLessen', function(){
	return Lessen.find();
});