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
                    threadsService.getThreads();
                }
            }
        })
        .when('threads/:threadId', {
            templateUrl: 'scripts/thread/thread.html',
            controller: 'threadCtrl',
            resolve: {
                threadRef: function(threadService, $route) {
                    return threadService.getThread($route.current.params.threadId);
                },
                commentsRef: function(threadService, $route) {
                    return threadService.getComments($route.current.params.threadId);
                }
            }
        })
        .otherwise('/', {
            templateUrl: 'scripts/threads/threads.html',
            controller: 'threadsCtrl'
        })
})
