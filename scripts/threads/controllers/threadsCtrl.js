var app = angular.module('rtfmApp');

app .controller('threadsCtrl', function ($scope, threadsRef, $firebaseArray, $firebaseObject, $firebaseAuth) {
    var root = 'https://smc-real-time-forum.firebaseio.com/';
    var ref = new Firebase(root);
    var authObj = $firebaseAuth(ref);
    $scope.authObj = authObj;
    $scope.loginBtnToggle = true;

    $scope.toggleRegisterBtn = function() {
        $scope.loginBtnToggle = !$scope.loginBtnToggle;
        $scope.registerBtnToggle = !$scope.registerBtnToggle;
    }

    authObj.$onAuth(function(authData) {
        $scope.authData = authData;

        if(authData) {
            var userRef = new Firebase(root + '/users' + authData.uid),
                user = $firebaseObject(userRef);
                $('.modal').css('display', 'none');

            user.$loaded().then(function(user) {
                user.login = new Date().toString();
                user.$save();
                user.$bindTo($scope, 'user');
            })
        }
    });

    $scope.login = function(user) {
        authObj.$authWithPassword(user).then(function(authData) {
            console.log('Logged in: ', authData);
            }, function(error) {
                alert(error);
        });
    };

    $scope.register = function(user) {
        console.log(user);
        authObj.$createUser(user).then(function(userData) {
            console.log('login userData', userData);
            $scope.login(user);
        }, function(error) {
            alert(error);
        });
    };

    $scope.threads = $firebaseArray(threadsRef);

    $scope.threads.$loaded().then(function (threads) {
        console.log(threads);
    });
    $scope.createThread = function (username, title) {
        $scope.threads.$add({
            username: username,
            title: title
        });
    }



})
