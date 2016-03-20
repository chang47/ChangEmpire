// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('app', ['ngCordova', 'ionic','ionic.service.core', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 
  'angular.directives-round-progress'])

.run(function($ionicPlatform, $cordovaPush, $http, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    var io = Ionic.io();
    var push = new Ionic.Push({
      "onNotification": function(notification) {
        console.log("I received a notfication!!!")
        alert("ANYTHING")
        $state.go('workoutExercise');
      },
    });

    var callback = function(token) {
      console.log('Registered token:', token.token);
      push.saveToken(token);

      $http({
        method: 'POST',
        url: 'http://104.131.56.14:3000/register',
        data: { platform: 'android', token: token.token }
      }).then(function successCallback(response){
        console.log("success");
        console.log(JSON.stringify([response]));
      }, function errorCallback(response) {
        console.log("failed");
        console.log(response);
        console.log(JSON.stringify([response]));
      });
    }

    push.register(callback);

    /*var androidConfig = {
      "senderID": "111111111"
    }
    console.log("RUN ISCALLED")
    $cordovaPush.register(androidConfig).then(function(result) {
      console.log("success " + result)
    }, function(err) {
      console.log("err " + err)
    })*/
    // check user and regsiter codehow much 
/*    push.register(function(token) {
      console.log("Device token:",token.token);
    });*/

  });


})
