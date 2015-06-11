var app = angular.module('rtfmApp');

app.controller('threadsCtrl', function($scope, threadsRef, $firebaseArray) {
    $scope.threads = $firebaseArray(threadsRef);
})
