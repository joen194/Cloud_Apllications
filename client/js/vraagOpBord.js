
var roomCode;

//################ Om de juiste roomcode uit de DB te halen #######################
Template.vraagOpBord.helpers({

	vraagnaam : function(){

		roomCode = window.location.hash.substr(1);
		Meteor.subscribe('DataLessenPopup', roomCode);

		var dbLes = Lessen.find().fetch();
		Meteor.subscribe('DataVragen', dbLes[0]._id);
		var vraag= Vragen.find({_id: dbLes[0].vraagId}).fetch();
		return vraag[0].vraagnaam;
	},	Roomcode : function(){

		return window.location.hash.substr(1);;
	},
	antwoordOpBord : function(){
		roomCode = window.location.hash.substr(1);
		Meteor.subscribe('DataLessenPopup', roomCode);
		var dbLes = Lessen.find().fetch();
		Meteor.subscribe('DataMultipleChoice');
		Meteor.subscribe('DataVragen', dbLes[0]._id);
		var vraagID = Vragen.find({_id: dbLes[0].vraagId}).fetch();
		Meteor.subscribe('DataAntwoorden', vraagID[0]._id);
		if (vraagID[0].visibleAnswer) {
			return Antwoorden.find();
		}

	},
	antwoordStyling : function(){
		/*willekeurige positionering en kleur */
		var maxSearchIterations = 100;
		var min_x = 0;
		var max_x = 900;
		var min_y = 0;
		var max_y = 500;
		var filled_areas = [];

		function calc_overlap(a1) {
		    var overlap = 0;
		    for (i = 0; i < filled_areas.length; i++) {

		        var a2 = filled_areas[i];

		        if (a1.x + a1.width < a2.x) {
		            continue;
		        }
		        if (a2.x + a2.width < a1.x) {
		            continue;
		        }
		        if (a1.y + a1.height < a2.y) {
		            continue;
		        }
		        if (a2.y + a2.height < a1.y) {
		            continue;
		        }

		        var x1 = Math.max(a1.x, a2.x);
		        var y1 = Math.max(a1.y, a2.y);
		        var x2 = Math.min(a1.x + a1.width, a2.x + a2.width);
		        var y2 = Math.min(a1.y + a1.height, a2.y + a2.height);
		        var intersection = ((x1 - x2) * (y1 - y2));

		        overlap += intersection;
		    }
		    return overlap;
		}

		function randomize() {

		    filled_areas.splice(0, filled_areas.length);

		    var index = 0;
		    $('.antwoordOpBord h1').each(function() {
		    	var rndm = Math.floor((Math.random() * 10) + 1);
		        var rand_x = 0;
		        var rand_y = 0;
		        var i = 0;
		        var smallest_overlap = 9007199254740992;
		        var best_choice;
		        var area;
		        for (i = 0; i < maxSearchIterations; i++) {

		            rand_x = Math.round(min_x + ((max_x - min_x) * (Math.random() % 1)));
		            rand_y = Math.round(min_y + ((max_y - min_y) * (Math.random() % 1)));
		            area = {
		                x: rand_x,
		                y: rand_y,
		                width: $(this).width(),
		                height: $(this).height()
		            };
		            var overlap = calc_overlap(area);
		            if (overlap < smallest_overlap) {
		                smallest_overlap = overlap;
		                best_choice = area;
		            }
		            if (overlap === 0) {
		                break;
		            }
		       
		        }

		        filled_areas.push(best_choice);

		             /*voor de kleuren van de text aan te passen */
		        switch(rndm){

		        	case 0:
		        	$(this).css({
		        	color: "DarkSalmon"
		        	});
		        	break;

		        	case 1:
		        	$(this).css({
		        	color: "blue"
		        	});
		        	break;

		        	case 2:
		        	$(this).css({
		        	color: "green"
		        	});
		        	break;

		        	case 3:
		        	$(this).css({
		        	color: "darkyellow"
		        	});
		        	break;

		        	case 4:
		        	$(this).css({
		        	color: "red"
		        	});
		        	break

		        	case 5:
		        	$(this).css({
		        	color: "black"
		        	});
		        	break;

		        	case 6:
		        	$(this).css({
		        	color: "orange"
		        	});
		        	break;

		        	case 7:
		        	$(this).css({
		        	color: "purple"
		        	});
		        	break;

		        	case 8:
		        	$(this).css({
		        	color: "Chartreuse "
		        	});
		        	break;

		        	case 9:
		        	$(this).css({
		        	color: "FireBrick "
		        	});
		        	break;

		        	case 10:
		        	$(this).css({
		        	color: "DarkSlateGray"
		        	});
		        	break;
		        }
		        
		        $(this).animate({
		            left: rand_x,
		            top: rand_y
		        });
		    });
		    return false;
			}
			randomize();
		}
});