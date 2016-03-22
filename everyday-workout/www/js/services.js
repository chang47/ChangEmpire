angular.module('app.services', [])

.factory('datesFactory', ['dateDb', '$http', '$window', function(dateDb, $http, $window){
	dates = {};
	dates.mon = dateDb.get('mon');
	dates.tue = dateDb.get('tue');
	dates.wed = dateDb.get('wed');
	dates.thu = dateDb.get('thu');
	dates.fri = dateDb.get('fri');
	dates.sat = dateDb.get('sat');
	dates.sun = dateDb.get('sun'); 
	dates.all = [dates.mon, dates.tue, dates.wed, dates.thu, dates.fri, dates.sat, dates.sun];

	dates.save = function(list) {
		if (list.length != 7) {
			return "error";
		} else {
			dateDb.set('mon', list[0]);
			dateDb.set('tue', list[1]);
			dateDb.set('wed', list[2]);
			dateDb.set('thu', list[3]);
			dateDb.set('fri', list[4]);
			dateDb.set('sat', list[5]);
			dateDb.set('sun', list[6]);

			// making the data to send to the server for it to schedule posts
			var serverList = []
			for (var i = 0; i < list.length; i++) {
				var obj = {workouts: list[i].dailyExercises};
				var workoutTime = [];
				for (var j = 0; j < list[i].list.length; j++) {
					if (list[i].list[j].style.backgroundColor == "#b2b2b2") {
						var date = list[i].list[j].date;
						if (date.length <= 4) {
							date = "0" + date;
						}
						workoutTime.push(date);
					}
				}
				obj.list = workoutTime;
				serverList.push(obj);
			}
			var serverData = JSON.stringify(serverList);
			$http({
			    method: 'POST',
			    url: 'http://104.131.56.14:3000/update-schedule',
			    data: { "token": $window.localStorage['token'], "dates": serverData}
			}).then(function(response) {
				console.log(response);
			}, function(response) {
				console.log(response);
			});
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
		var obj = JSON.parse($window.localStorage[day] || '{}');
		
		// check to see if we have new or somehow empty list
		if (typeof(obj.list) == 'undefined' || obj.list.length != 96) {
			db.createData(day);
			obj = db.get(day);
			console.log(obj);
		}
		return obj;
	}

	db.createData = function(day) {
		var obj = {};
		obj.dailyExercises = 5;
		obj.list = [];
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
			obj.list.push(object);
		}
		db.set(day, obj);
	} 
	return db;
}])

.factory('exerciseFactory',['exerciseDb', function(exerciseDb){
	var exercises = {};
	exercises.list = exerciseDb.get();
	exercises.save = function(list){
		console.log("In factory ",list);
		if (list.length !=1){
			console.log("Error");
			return "error";
		} else {
			console.log("INSIDE SAVE OF EXERCISE FACTPRY " + list[0].sets + " " + list[0].reps)
			exerciseDb.set(list);
			exercises.list = exerciseDb.get()
			console.log("EXERCISE FACTORY, DB GET RETURN " + exercises.list[0].sets + " " + exercises.list[0].reps)
			
		}
	}

	return exercises;
}])

.factory('exerciseDb', ['$window', function($window){
	db = {};
	db.set = function(list){
		console.log("IN THE DB SAVING: " + list[0].sets + " " + list[0].reps);
		$window.localStorage['exercises'] = JSON.stringify(list);

		var groups = db.get();
		console.log("RETURNED FROM SAVE: " + groups[0].sets + " " + groups[0].reps)
	}

	db.get = function(){
		var list = JSON.parse($window.localStorage['exercises'] || '[]');

		if (list.length == 0){
			db.createData();
			list = db.get();
		}
		return list;
	}

	db.createData = function() {
		var list = [];
		list.push({ name:"Push up", sets:3, reps:5,enabled:true });

		db.set(list);
	}

	return db;

}]);