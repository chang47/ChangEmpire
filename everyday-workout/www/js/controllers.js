angular.module('app.controllers', [])
  
.controller('workoutMainMenuCtrl', function($scope) {

})
   
.controller('workoutCalendarCtrl', function($scope, datesFactory) {
	$scope.tab = 0;
	$scope.dates = datesFactory.all;
	// fun fact [] interprets the value as the key
	$scope.select = function(index) {
		$scope.dates[$scope.tab][index].selected = !$scope.dates[$scope.tab][index].selected
		console.log($scope.dates[$scope.tab]);
		if ($scope.dates[$scope.tab][index].style.backgroundColor == "white") {
			$scope.dates[$scope.tab][index].style.backgroundColor = "#b2b2b2";
		} else {
			$scope.dates[$scope.tab][index].style.backgroundColor = "white";
		}
	}

	$scope.swapTab = function(tab) {
		$scope.tab = tab;
		console.log($scope.tab);
	}
})
   
.controller('workoutTimeEditorCtrl', function($scope) {

})
   
.controller('workoutGlossaryCtrl', function($scope) {

})
   
.controller('workoutExerciseCtrl', function($scope) {

})
   
.controller('workoutAdsCtrl', function($scope) {

})
 