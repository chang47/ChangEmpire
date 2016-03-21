// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


function handleOpenURL(url) {
  //var path = url.slice(8) // strips away myapp://
  //window.localStorage.setItem("externalUrl", path);
  console.log("URL is: ", url)
}

angular.module('app', ['ionic','ionic.service.core', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 
  'angular.directives-round-progress', 'ngCordova'])

.run(function($ionicPlatform, $cordovaPush,$state,$rootScope,$http, $window) {
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
    var push = new Ionic.Push({
      onNotification:function(response){
        console.log("Recieved Notification: ",response);
        $state.go('workoutExercise')
      }
      
    });

    var callback = function(token) {
      console.log('Registered token:', token.token);

      if (typeof($window.localStorage['token']) == 'undefined') {
        var time = new Date().getTimezoneOffset();  
        time = Math.floor(time / 60);
        $http({
          method: 'POST',
          url: 'http://104.131.56.14:3000/register',
          // prefix will be handled by the server
          data: { platform: 'android', "token": token.token, "timezone": time}
        }).then(function successCallback(response){
          console.log("success");
          console.log(JSON.stringify([response]));
        }, function errorCallback(response) {
          console.log("failed");
          console.log(response);
          console.log(JSON.stringify([response]));
        });
        $window.localStorage['token'] = token.token;
      }
    }

    push.register(callback);

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      //$state.go(notification);
      console.log("Notification. $ is on");
    })

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
