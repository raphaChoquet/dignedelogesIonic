// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])
.factory('User', function ($http, $rootScope) {
  return {
    get: function () {
      var userString = window.localStorage['User'];
      if(userString) {
        return angular.fromJson(userString);
      } else {
        return false
      }
    },
    save: function(user) {
      window.localStorage['User'] = angular.toJson(user);
    },
    refresh: function () {
      var self = this;
      $http.get('http://api.dignedeloges.com/oauth/v2/token?client_id=' + $rootScope.user.clientId + '&client_secret=' + $rootScope.user.clientSecret + '&grant_type=refresh_token&refresh_token=' + $rootScope.user.refreshToken)
        .success(function (data, status) {
          $rootScope.user.accessToken = data.access_token;
          $rootScope.user.refreshToken = data.refresh_token;
          $rootScope.user.dateConnection = new Date();
          $rootScope.user.expireIn = data.expires_in;
          self.save($rootScope.user);
          window.setTimeout(function () {
            self.refresh();
          }, 3500000);
      });
    }
  }
})
.run(function($ionicPlatform, $rootScope, User, $http, $location) {
  $rootScope.url = 'http://symfo.dev/';

  $rootScope.user = User.get();
  if ($rootScope.user === false) {
    $rootScope.user = {
      clientId: "6_62yxhdac42gwcck0wk8kk4ks84wswgk44ko4cg4wsw4c4sowsk",
      clientSecret: "maqa75e9hyoooc008cg8ccc4s4gco8w80occo8gsg4cs0o000"
    };

    User.save($rootScope.user);
  }

  if ($rootScope.user.refreshToken) {
    User.refresh();
  }

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
      templateUrl: "templates/prehome.html",
      controller: 'ConnectionCtrl'
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

