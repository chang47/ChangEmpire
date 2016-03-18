angular.module('app.controllers', [])

.controller('workoutMainMenuCtrl', function($scope,$http) {
	$scope.request = function() {
			$http({
				method: 'POST',
				url: 'http://localhost:3000/register',
				data: { platform: 'android', token: "11111111"}
		}).then(function successCallback(response){
			console.log("success")
			console.log(response)
		}, function errorCallback(response) {
			console.log("failed")
			console.log(response)
		});
	}
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
   
.controller('workoutExerciseCtrl', function($scope, $interval,exerciseFactory) {
	// Note to self: import a number in to the label.
	$scope.groups = exerciseFactory;
	var exNum = Math.random()*($scope.groups.length);
	console.log("Random Number:",exNum);
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

.controller('workoutGlossaryCtrl', function($scope,$location,exerciseFactory) {
	$scope.disabled = true;
	$scope.groups = exerciseFactory;
	groups = JSON.parse(JSON.stringify($scope.groups));
	console.log("Groups: ",groups);
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
    	console.log($scope.groups);
    	$scope.disabled = false;
    }

    $scope.save = function(){
    	console.log("Saved Changes: ",$scope.groups);
    	for(var numOfGroups=0;numOfGroups<$scope.groups.length;numOfGroups++){

    		if (isNaN(parseInt($scope.groups[numOfGroups].sets))){
    			$scope.groups[numOfGroups].sets = 0;
    		}
    		if (isNaN(parseInt($scope.groups[numOfGroups].reps))){
    			$scope.groups[numOfGroups].reps = 0;
    		}
    		$scope.groups[numOfGroups].sets = parseInt($scope.groups[numOfGroups].sets);
    		$scope.groups[numOfGroups].reps = parseInt($scope.groups[numOfGroups].reps);
    	}
	    	exerciseFactory.save($scope.groups);
			groups = JSON.parse(JSON.stringify($scope.groups));
			$scope.groups = JSON.parse(JSON.stringify(groups));
			$scope.disabled = true;
	    	$location.path('#/main');
    }
    $scope.cancel = function(){
			$scope.groups = JSON.parse(JSON.stringify(groups));
			$scope.disabled = true;
	    	$location.path('#/main');
    }
});
