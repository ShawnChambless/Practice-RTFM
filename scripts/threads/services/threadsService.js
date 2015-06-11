var app = angular.module('rtfmApp');

app.service('threadsService', function(fb) {

    this.getThreads = function() {
        var threadsRef = new Firebase(fb.url + '/threads');
    };
    this.getThread = function(threadId) {
        var threadsRef = newFirebase(fb.url + '/threads' + threadId);
    };
});
