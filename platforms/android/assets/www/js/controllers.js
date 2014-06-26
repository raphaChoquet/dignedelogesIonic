angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope) {

})
.controller('CreateChallengeCtrl', function ($scope) {
  $scope.takePicture = function () {
    var optionsVideo = {
      limit: 1,
      duration: 30
    };
    //success callback
    var captureSuccess = function (mediaFiles) {
      $scope.video = mediaFiles[0];
      alert($scope.video.type);
      $scope.$digest();
      //...
    };
    //error callback
    var captureError = function (error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    var capture = function () {
      navigator.device.capture.captureVideo(captureSuccess, captureError, optionsVideo);
    };
    // run the above function
    capture();
  }

  $scope.uploadVideo = function () {

    var upload = function (videoURI) {
      var options = new FileUploadOptions();
      var ft = new FileTransfer();
      options.fileKey = "file";
      //create a unique file name based on the timestamp, use this in the server for time information, or time metadata in the video clip itself.
      options.fileName = $scope.video.name;
      options.mimeType = "video/mov";
      options.httpMethod = "POST";
      options.params = $scope.form;
      //this is needed to grab the file correctly on IOS
      videoURI = 'file://' + videoURI;  
      ft.upload(videoURI, "http://zipclips.herokuapp.com/clips", postSuccess, postFailure, options, true); //boolean is for trustAllHosts
    };

    var postSuccess = function (response) {
      //...
    };

    var postFailure = function (error) {
      //...
    };
    //call the upload function above with the video path on the scope
    upload($scope.video.fullPath);
  }
});