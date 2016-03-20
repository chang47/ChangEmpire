angular.module('app.controllers', [])

.controller('workoutMainMenuCtrl', function($scope,$http) {

	
    /*var io = Ionic.io();
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
      	console.log("I received a notfication!!!")
        $state.go('workoutExercise');
      },
    });*/

	$scope.request = function() {
			$http({
				method: 'POST',
				url: 'http://104.131.56.14:3000/register',
				data: { platform: 'android', token: "11111111"}
		}).then(function successCallback(response){
			console.log("success");
			console.log(JSON.stringify([response]));
		}, function errorCallback(response) {
			console.log("failed");
			console.log(response);
			console.log(JSON.stringify([response]));
		});
	}
})
   
.controller('workoutCalendarCtrl', function($scope, $ionicPopup, datesFactory) {
	$scope.tab = 0;
	$scope.dates = datesFactory.all;
	$scope.changed = false;
	$scope.selected = [];

	// fun fact [] interprets the value as the key
	$scope.select = function(index) {
		$scope.changed = true;
		$scope.dates[$scope.tab][index].selected = !$scope.dates[$scope.tab][index].selected
		if ($scope.dates[$scope.tab][index].style.backgroundColor == "white") {
			$scope.dates[$scope.tab][index].style.backgroundColor = "#b2b2b2";
			//$scope.selected.push({tab: $scope.tab, 'index': index});
		} else {
			$scope.dates[$scope.tab][index].style.backgroundColor = "white";
		}
		// problem, what if on by default? seperate list: selected and not
		/*if ($scope.selected.length == 0) {
			$scope.changed = false;
		}*/
	}

	$scope.swapTab = function(tab) {
		$scope.tab = tab;
		console.log($scope.tab);
	}

	$scope.saveChanges = function() {
		datesFactory.save($scope.dates);
		$scope.selected = [];
		$scope.changed = false;
	}

	$scope.clear = function() {
		var day;
		if ($scope.tab == 0) {
			day = "Monday";
		} else if ($scope.tab == 1) {
			day = "Tuesday";
		} else if ($scope.tab == 2) {
			day = "Wednesday";
		} else if ($scope.tab == 3) {
			day = "Thursday";
		} else if ($scope.tab == 4) {
			day = "Friday";
		} else if ($scope.tab == 5) {
			day = "Saturday";
		} else {
			day = "Sunday";
		} 
		var popup = $ionicPopup.show({
			title: 'Clear Time Slots',
			template: "<center>Clear all time slots for " + day + "?</center>",
			scope: $scope,
			buttons: [
				{ text: 'No'},
				{ text: '<b>Yes</b>',
				  type: 'button-positive',
				  onTap: function(e) {
				  	$scope.changed = true;
				  	list = $scope.dates[$scope.tab];
				  	for (var i = 0; i < list.length; i++) {
				  	  list[i].style.backgroundColor = "white";
				  	  list[i].selected = false;
				  	}
				  }
				}
			]
		});
	}
})
   
.controller('workoutTimeEditorCtrl', function($scope, $stateParams, $cordovaDatePicker, $cordovaToast, datesFactory) {
	var dates = datesFactory.all	

	$scope.convertTime = function(date) {
  		var newMinute = date.getMinutes() % 15;
  		return new Date(date.getTime() - newMinute * 1000 * 60);
	};

	$scope.convertMinute = function(minute) {
		if (minute == 0) {
			return (minute + "0");
		} else {
			return minute;
		}
	}

	var date = $scope.convertTime(new Date());

	$scope.startHour = date.getHours();
	$scope.startMinute = date.getMinutes();
	$scope.startShowMinute = $scope.convertMinute($scope.startMinute);
	$scope.endHour = date.getHours();
	$scope.endMinute = date.getMinutes();
	$scope.endShowMinute = $scope.convertMinute($scope.endMinute);

  	document.addEventListener("deviceready", function () {
  		var options = {
			    'date': new Date(),
			    mode: 'time', // or 'time'
			    'minDate': new Date(),
			    allowOldDates: true,
			    allowFutureDates: false,
			    doneButtonLabel: 'DONE',
			    doneButtonColor: '#F2F3F4',
			    cancelButtonLabel: 'CANCEL',
			    cancelButtonColor: '#000000'//,
			    //minuteInterval: 15
		  	};

	    $scope.clickOne = function() { 
	  		$cordovaDatePicker.show(options).then(function(date) {
		  		var startTime = $scope.convertTime(date);
	        	$scope.startHour = startTime.getHours();
	        	$scope.startMinute = startTime.getMinutes();
	        	$scope.startShowMinute = $scope.convertMinute($scope.startMinute);
	  		}, false);
		};

		$scope.clickTwo = function() { 
	  		$cordovaDatePicker.show(options).then(function(date) {
	  			var endTime = $scope.convertTime(date);
	        	$scope.endHour = endTime.getHours();
	        	$scope.endMinute = endTime.getMinutes();
	        	$scope.endShowMinute = $scope.convertMinute($scope.endMinute);
	  		}, false);
		};

		$scope.addTime = function() {
			var startPos = $scope.startHour * 4 + $scope.startMinute / 15;
			var endPos = $scope.endHour * 4 + $scope.endMinute / 15;
			var tab = $stateParams['day'];
			for (var i = startPos; i < endPos; i++) {
				dates[tab][i].selected = true;
				dates[tab][i].style.backgroundColor = "#b2b2b2";
			}
			datesFactory.save(dates);
			
			if (endPos <= startPos) {
				$cordovaToast.show('Please enter valid time', 'long', 'bottom');
			} else {
				$cordovaToast.show("" + $scope.startHour + ":" + $scope.startShowMinute + " - " + $scope.endHour 
					+ ":" + $scope.endShowMinute + " added!", 'long', 'bottom');
			}
		}
	});
})
   
.controller('workoutExerciseCtrl', function($scope, $interval,exerciseFactory) {
	// Note to self: import a number in to the label.
	$scope.groups = exerciseFactory.list;
	//var exNum = Math.random()*($scope.groups[0].list.length);
	//console.log("Random Number:",exNum);
	var amountTimes = ($scope.groups[0].sets*20)+($scope.groups[0].sets*$scope.groups[0].reps*5);
	
	$scope.roundProgressData = {
		label: amountTimes,
		percentage: 0
	}
	
	
	$scope.timeLoop = function(){
		if ($scope.roundProgressData.percentage <= 1){
			$scope.roundProgressData.percentage += .035;
		}
		else {
			$scope.roundProgressData.percentage = 0;
			--$scope.roundProgressData.label;
		}
		
		if ($scope.roundProgressData.label <= 0) {
			$scope.roundProgressData.percentage = 0;
			$scope.roundProgressData.label = 0;
			
			$interval.cancel(callLoop);
			console.log("Failure Statement");
			
		}
	}
		
	var callLoop = $interval( function(){ $scope.timeLoop(); }, 50);
	
	
})
   
.controller('workoutAdsCtrl', function($scope) {

})

.controller('workoutGlossaryCtrl', function($scope,$location,$ionicHistory,exerciseFactory) {
	$scope.disabled = true;
	$scope.groups = exerciseFactory.list;
	console.log("ONLOAD GROUP IS: " + $scope.groups[0].sets + " " + $scope.groups[0].reps)
	var groups = copy($scope.groups);
	$scope.groups = copy(groups);
	//console.log("Groups: ",groups);
	
	console.log("beign called");
	$ionicHistory.clearCache()
	//groups = $scope.groups;
  //for (var i=0; i<10; i++) {
    //for (var j=0; j<3; j++) {
    //}
  //}
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
    	$scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
    	return $scope.shownGroup === group;
    };

    $scope.changed = function() {
    	$scope.disabled = false;
    }

    $scope.save = function(){
    	console.log("Saved Changes: ",$scope.groups);
    	for(var numOfGroups=0;numOfGroups<$scope.groups.length;numOfGroups++){

    		$scope.groups[numOfGroups].sets = parseInt($scope.groups[numOfGroups].sets);
    		$scope.groups[numOfGroups].reps = parseInt($scope.groups[numOfGroups].reps);
    		if (isNaN($scope.groups[numOfGroups].sets)){
    			$scope.groups[numOfGroups].sets = 0;
    		}
    		if (isNaN($scope.groups[numOfGroups].reps)){
    			$scope.groups[numOfGroups].reps = 0;
    		}
    	}
    	console.log("WHAT I AM SAVING", $scope.groups[0].sets + " " + $scope.groups[0].reps)
	    exerciseFactory.save($scope.groups);
		groups = copy($scope.groups);
		$scope.groups = copy(groups);
		console.log("WHAT I AM NOW", exerciseFactory.list[0].sets + " " + exerciseFactory.list[0].reps)
		//groups = JSON.parse(JSON.stringify($scope.groups));
		//$scope.groups = JSON.parse(JSON.stringify(groups));
		$scope.disabled = true;
    }
    $scope.cancel = function(){
		//$scope.groups = JSON.parse(JSON.stringify(groups));
		console.log(groups);
		$scope.groups = copy(groups);
		$scope.disabled = true;
    }

    function copy(groups) {
    	list = [];
    	for (var numOfGroups=0;numOfGroups<groups.length;numOfGroups++) {
    		obj = {};
    		obj['sets'] = groups[numOfGroups].sets;
    		obj['reps'] = groups[numOfGroups].reps;
    		obj['name'] = groups[numOfGroups].name;
    		obj['enabled'] = groups[numOfGroups].enabled;
    		list.push(obj)
    	}
    	return list;
    }
});
