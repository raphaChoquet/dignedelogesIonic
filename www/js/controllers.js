angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $rootScope, $location, $http) {
  if (!$rootScope.user.accessToken) {
    $location.path( "/connection" );
  }

  $http.get('http://api.dignedeloges.com/api/me?access_token=' + $rootScope.user.accessToken)
    .success(function (data) {
      alert(JSON.stringify(data));
    })
    .error(function (error) {
      navigator.notification.alert(error.code + ': Impossible de récupérer vos informations personnelles', null, 'Alerte');
    });
})

.controller('ConnectionCtrl', function ($rootScope, $location) {
  if ($rootScope.user.accessToken) {
    $location.path( "/app/home" );
  }
})

.controller('LoginCtrl', function ($scope, $http, $rootScope, $location, User) {
  if ($rootScope.user.accessToken) {
    $location.path( "/app/home" );
  }
/*
  $scope.user = User.get();
  console.log($scope.user);*/

  if ($rootScope.accessToken) {
    $location.path( "/app/home" );
  }

  $scope.form = {
    username: '',
    password: ''
  };

  $scope.login = function () {

/*    if (!loginForm.$valid ) {
      $scope.msgError = "error";
      return;
    }*/
    $http.get('http://api.dignedeloges.com/oauth/v2/token?client_id=' + $rootScope.user.clientId + '&client_secret=' + $rootScope.user.clientSecret + '&grant_type=password&username=' + $scope.form.username + '&password=' + $scope.form.password)
      .success(function (data, status) {
        $rootScope.user.accessToken = data.access_token;
        $rootScope.user.refreshToken = data.refresh_token;
        $rootScope.user.dateConnection = new Date();
        $rootScope.user.expireIn = data.expires_in;
        User.save($rootScope.user);
        $location.path( "/app/home" );
      })
      .error(function (data, status) {
        console.log(data, status);
      });
  };
})

.controller('CreateChallengeCtrl', function ($scope, $rootScope) {
  $scope.takePicture = function () {
    var optionsVideo = {
      limit: 1,
      duration: 30
    };
    //success callback
    var captureSuccess = function (mediaFiles) {
      $scope.video = mediaFiles[0];
      alert($scope.video.size);
      if ($scope.video.size > 31457280 ) {
        navigator.notification.confirm("Erreur la vidéo dépasse la taille maximal autorisé de 30mo", function (i) { if (i===1) {capture();}}, 'Taille maximal', ['Reprendre une vidéo', 'Annuler']);
        $scope.video = null;
      }
      $scope.$digest();
    };
    //error callback
    var captureError = function (error) {
      if (error.code !== 3) {
        navigator.notification.alert(error.code + ': Impossible de prendre une vidéo', null, 'Erreur de capture');
      }
    };

    var capture = function () {
      navigator.device.capture.captureVideo(captureSuccess, captureError, optionsVideo);
    };
    // run the above function
    if ($scope.video) {
      navigator.notification.confirm("Vous souhaitez prendre une nouvelle vidéo ?", function (i) { if (i===1) {capture();}}, 'Nouvelle prise', ['Oui', 'Annuler']);
    } else {
      capture();
    }
  }

  $scope.uploadVideo = function () {
    var upload = function (videoURI) {

      var options = new FileUploadOptions();
      var ft = new FileTransfer();
      options.fileKey = "form[file]";
      //create a unique file name based on the timestamp, use this in the server for time information, or time metadata in the video clip itself.
      options.fileName = $scope.video.name;
      options.mimeType = $scope.video.mp4;
      options.httpMethod = "POST";
      options.params = {
        'form[title]': $scope.form.title,
        'form[description]': $scope.form.description
      };
      //this is needed to grab the file correctly on IOS
      ft.upload(videoURI, "http://api.dignedeloges.com/app_dev.php/api/challenges/launcheds?access_token=" + $rootScope.user.accessToken, postSuccess, postFailure, options, true); //boolean is for trustAllHosts
    };

    var postSuccess = function (response) {
      console.log(response);
      $scope.response = response.response;
      $scope.$digest();
    };

    var postFailure = function (error) {
      alert('erreur');
      console.log(error);
    };

    if ($scope.launchChallenge.$valid && $scope.video) {
      upload($scope.video.localURL);
    }
  }
});
