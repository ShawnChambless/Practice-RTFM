var app = angular.module('rtfmApp', ['firebase', 'ngRoute']);

app.constant('fb', {
    url: 'https://smc-real-time-forum.firebaseio.com/'
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/threads', {
            templateUrl: 'scripts/threads/threads.html',
            controller: 'threadsCtrl',
            resolve: {
                threadsRef: function(threadsService) {
                    threadService.getThreads();
                }
            }
        })
        .otherwise('/', {
            templateUrl: 'scripts/home/home.html',
            controller: 'mainCtrl'
        })
})
