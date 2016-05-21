angular.module("app")
    .controller("studioCtrl", function($scope, ngAudio) {

        $scope.sound = ngAudio.load("../media/spice.mp3"); // returns NgAudioObject
        console.log($scope.sound);
        $scope.play = function() {
            $scope.sound.play();
        }
        $scope.stop = function() {
            $scope.sound.stop();
        }
});
