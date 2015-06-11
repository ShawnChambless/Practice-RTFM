var app = angular.module('rtfmApp');

app.service('threadService', function() {
    this.getComments = function(threadId) {
        return newFirebase(fb.url + '/threads/' + threadId + '/comments');
    }
});
