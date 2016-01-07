angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('workoutMainMenu', {
      url: '/main',
      templateUrl: 'templates/workoutMainMenu.html',
      controller: 'workoutMainMenuCtrl'
    })
           
    .state('workoutCalendar', {
      url: '/calendar',
      templateUrl: 'templates/workoutCalendar.html',
      controller: 'workoutCalendarCtrl'
    })
  
    .state('workoutTimeEditor', {
      url: '/timeEditor/:day',
      templateUrl: 'templates/workoutTimeEditor.html',
      controller: 'workoutTimeEditorCtrl'
    })
   
    .state('workoutGlossary', {
      url: '/glossary',
      templateUrl: 'templates/workoutGlossary.html',
      controller: 'workoutGlossaryCtrl'
    })
    // not reached
    .state('workoutExercise', {
      url: '/exercise',
      templateUrl: 'templates/workoutExercise.html',
      controller: 'workoutExerciseCtrl'
    })
    // not reached normally, probably shouldn't even exist, just an ad popup
    .state('workoutAds', {
      url: '/ads',
      templateUrl: 'templates/workoutAds.html',
      controller: 'workoutAdsCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');

});