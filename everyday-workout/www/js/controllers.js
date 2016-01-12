angular.module('app.controllers', [])

.controller('workoutMainMenuCtrl', function($scope) {

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
   
.controller('workoutGlossaryCtrl', function($scope) {

})
   
.controller('workoutExerciseCtrl', function($scope, $interval) {
	// Justin stuff
	$scope.roundProgressData = {
	  label: 10,
	  percentage: 0.11
	};
})
   
.controller('workoutAdsCtrl', function($scope) {

})
 