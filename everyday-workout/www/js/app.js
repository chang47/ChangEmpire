// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('app', ['ionic','ionic.service.core', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 
  'angular.directives-round-progress', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    window.parsePlugin.initialize(appId, clientKey, function() {
      console.log('Parse initialized successfully')

      window.parsePlugin.subscribe('Test1', function() {
        console.log("subscribed!");

        window.parsePlugin.getInstallationId(function(id) {
          console.log("got ID " + id);
        }, function(e) {
          console.log("failed to get id");
        });
      }, function(e) {
        console.log("failed to subscribe");
      });
    }, function(e) {
      console.log("failed to initialize");
    });

    // check user and regsiter codehow much 
/*    push.register(function(token) {
      console.log("Device token:",token.token);
    });*/

  });
})