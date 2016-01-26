angular.module('app.controllers', [])

.controller('workoutMainMenuCtrl', function($scope) {

})
   
.controller('workoutCalendarCtrl', function($scope, datesFactory) {
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
})
   
.controller('workoutTimeEditorCtrl', function($scope, $stateParams) {
	console.log($stateParams);
})
   
.controller('workoutGlossaryCtrl', function($scope) {

})
   
.controller('workoutExerciseCtrl', function($scope, $interval) {
	// Note to self: import a number in to the label.
	var amountTimes = 2;
	
	$scope.roundProgressData = {
		label: 2,
		percentage: 0
	}
	
	
	$scope.timeLoop = function(){
		if ($scope.roundProgressData.percentage <= 1){
			$scope.roundProgressData.percentage += .05;
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
