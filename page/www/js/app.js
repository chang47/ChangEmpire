// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('index', {
			url: '/',
			templateUrl: 'templates/index.html',
			controller: 'IndexController'
		})
		.state('readAll', {
			url: '/readAll',
			templateUrl: 'templates/readAll.html',
			controller: 'ReadController'
		})
		
	$urlRouterProvider.otherwise('/');
}])

.factory('userDb', function() {
	db = {};
	db.list = [
					{id: 1, name: "josh"},
					{id: 2, name: "justin"},
					{id: 3, name: "bill"},
					{id: 4, name: "bob"},
				]
	db.getUsers = function() {
		return db.list;
	}

	db.addUser = function(user) {
		// in theory, the db would have created the it itself
		if (db.list.length == 0) {
			user.id = 1;
		} else {
			user.id = db.list[db.list.length - 1].id + 1;
		}
		db.list.push(user);
	}

	db.deleteUser = function(userId) {
		for (var i = 0; i < db.list.length; i++) {
			if (userId == db.list[i].id) {
				db.list.splice(i, 1);
				break;
			}
		}
	}

	return db;
})

.factory('userObject', ['userDb', function(userDb) {
	var users = {};
	users.list = userDb.getUsers();
	users.delete = function(userId) {
		userDb.deleteUser(userId);
	}

	users.add = function(username) {
		user = {id: 0, name: username};
		userDb.addUser(user);
	}

	return users;
}])

.controller("IndexController", function($scope) {
 
})

.controller('ReadController', function($scope, userObject) {
	$scope.users = userObject.list;
	$scope.delete = function(userId) {
		userObject.delete(userId);
	}
	$scope.add = function(name) {
		if (name.length != 0) {
			console.log($scope.newName);
			userObject.add(name);
			$scope.newName = "";
		}
	}

	// for the text input
	$scope.newName = "";
})
