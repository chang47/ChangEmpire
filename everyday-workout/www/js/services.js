angular.module('app.services', [])

.factory('datesFactory', ['dateDb', function(dateDb){
	dates = {};
	dates.mon = dateDb.get('mon');
	dates.tue = dateDb.get('tue');
	dates.wed = dateDb.get('wed');
	dates.thu = dateDb.get('thu');
	dates.fri = dateDb.get('fri');
	dates.sat = dateDb.get('sat');
	dates.sun = dateDb.get('sun'); 
	dates.save = function(day, list) {
		if (list.length != 4 * 24) {
			return "error";
		} else {
			dateDb.set(day, list);
		}
	}
	return dates;
}])


// example of what date object would look like:
// {time: "0:00", selected: false, style: {"backgroundColor": "white", "borderTop": "none"}, style2: {"borderTop": "none"}}
.factory('dateDb', ['$window', function($window){
	db = {};
	db.set = function(day, list) {
		$window.localStorage[day] = JSON.stringify(list);
	}

	db.get = function(day) {
		var list = JSON.parse($window.localStorage[day] || '[]');
		
		// check to see if we have new or somehow empty list
		if (list.length != 96) {
			db.createData(day);
			list = db.get(day);
		}
		return list;
	}

	db.createData = function(day) {
		var list = [];
		for (var time = 0; time < 4 * 24 * 15; time += 15) {
			var object = {};
			var hour = Math.floor(time / 60);
			var minute = time % 60;
			object.date = "" + hour + ":" + minute;
			if (minute == 0) {
				object.date += "0";
			}
			object.selected = false;
			object.style = {};
			object.style.backgroundColor = "white";

			// first case
			if (time == 0) {
				object.style.borderTop = "none";
				object.style2 = { borderTop: "none"};
			}

			// last case
			if (time == 4 * 24 * 15 - 15) {
				object.style.borderBottom = "none";
				object.style2 = { borderBottom: "none"};
			}
			list.push(object);
		}
		db.set(day, list);
	} 

	return db;
}]);

