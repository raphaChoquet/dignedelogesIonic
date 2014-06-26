angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope) {

})
.controller('CreateChallengeCtrl', function ($scope) {
  $scope.description = "fsefhseifhseifjsejs";
  var captureChallengeSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
    }
  },
  captureChallengeError = function () {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  };

  $scope.upload = function ($event) {
    var optionsVideo = {
      limit: 1,
      duration: 30
    };
    navigator.device.capture.captureVideo(
      captureChallengeSuccess, captureChallengeError, optionsVideo
    );
  };
});