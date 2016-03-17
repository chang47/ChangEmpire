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

.controller('workoutGlossaryCtrl', function($scope,exerciseFactory) {
	$scope.disabled = true;
	$scope.groups = exerciseFactory;
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
    	console.log($scope.groups);
    	$scope.disabled = false;
    }

    $scope.save = function(){
    	console.log("Saved Changes: ",$scope.groups);
    	for(var numOfGroups=0;numOfGroups<$scope.groups.length;numOfGroups++){
    		if ($scope.groups[numOfGroups].sets){
    			$scope.groups.sets = 0;
    		}
    		if ($scope.groups[numOfGroups].reps){
    			$scope.groups.reps = 0;
    		}
    	}
	    	exerciseFactory.save($scope.groups);
    }
});
