angular.module('app.controllers', ['angular.directives-round-progress'])

.controller('workoutMainMenuCtrl', function($scope) {

})
   
.controller('workoutCalendarCtrl', function($scope) {
	$scope.dates = [
					{time: "0:00", selected: false, style: {"backgroundColor": "white", "borderTop": "none"}, style2: {"borderTop": "none"}}, {time: "0:15", selected: false, style: {"backgroundColor": "white"}}, {time: "0:30", selected: false, style: {"backgroundColor": "white"}}, {time: "0:45", selected: false, style: {"backgroundColor": "white"}},
					{time: "1:00", selected: false, style: {"backgroundColor": "white"}}, {time: "1:15", selected: false, style: {"backgroundColor": "white"}}, {time: "1:30", selected: false, style: {"backgroundColor": "white"}}, {time: "1:45", selected: false, style: {"backgroundColor": "white", borderBottom: "none"}, style2: {"borderBottom": "none"}}
/*					"2:00", "2:15", "2:30", "2:45",
					"3:00", "3:15", "3:30", "3:45",
					"4:00", "4:15", "4:30", "4:45",
					"5:00", "5:15", "5:30", "5:45",
					"6:00", "6:15", "6:30", "6:45",
					"7:00", "7:15", "7:30", "7:45",
					"8:00", "8:15", "8:30", "8:45",
					"9:00", "9:15", "9:30", "9:45",
					"10:00", "10:15", "10:30", "10:45",
					"11:00", "11:15", "11:30", "11:45",
					"12:00", "12:15", "12:30", "12:45"*/
					];
	var length = $scope.dates.length - 1;
	// fun fact [] interprets the value as the key
	//$scope.edgeStyle = {0: {backgroundTop: "none"}, [length]: {backgroundBottom: "none"}};
	//console.log($scope.edgeStyle);
	$scope.select = function(index) {
		$scope.dates[index].selected =	!$scope.dates[index].selected
		console.log($scope.dates[index]);
		if ($scope.dates[index].style.backgroundColor == "white") {
			$scope.dates[index].style.backgroundColor = "#b2b2b2";
		} else {
			$scope.dates[index].style.backgroundColor = "white";
		}
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
 