// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope) {
  $rootScope.clientId = "1_4deff7bk6o840k8goks804kcsscwogg8sckcssocw48gsc0s8g";
  $rootScope.clientSecret = "c51a942gp7w4g00os8kk00o0o4c088k88cgoc8scckw00wwos";

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
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('connection', {
      url: "/connection",
      templateUrl: "templates/prehome.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "templates/register.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
        }
      }
    })
    .state('app.challengeMenu', {
      url: '/challenges',
      views: {
        'menuContent': {
          templateUrl: 'templates/challenge/menu.html',
        }
      }
    })
    .state('app.challengeCreate', {
      url: '/challenge/create',
      views: {
        'menuContent': {
          templateUrl: 'templates/challenge/create.html',
          controller: 'CreateChallengeCtrl'
        }
      },
    })
    .state('app.challengeInProgress', {
      url: '/challenge/inprogress',
      views: {
        'menuContent': {
          templateUrl: 'templates/challenge/listInProgress.html',
        }
      }
    })
    .state('app.challengeFinished', {
      url: '/challenge/finished',
      views: {
        'menuContent': {
          templateUrl: 'templates/challenge/listFinish.html',
        }
      }
    })
    .state('app.challengeCard', {
      url: '/challenge',
      views: {
        'menuContent': {
          templateUrl: 'templates/challenge/card.html',
        }
      }
    })
    .state('app.profilList', {
      url: '/profils',
      views: {
        'menuContent': {
          templateUrl: 'templates/profil/list.html',
        }
      }
    })
    .state('app.profilCard', {
      url: '/profil',
      views: {
        'menuContent': {
          templateUrl: 'templates/profil/card.html',
        }
      }
    })
    .state('app.parameters', {
      url: '/parameters',
      views: {
        'menuContent': {
          templateUrl: 'templates/parameters.html',
        }
      }
    })


  $urlRouterProvider.otherwise('/connection');
});

