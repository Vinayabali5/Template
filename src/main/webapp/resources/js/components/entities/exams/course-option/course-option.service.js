angular.module('CourseOptionService', []).factory('CourseOption', function($http, GLOBAL) {
    var self = this;
    var url = GLOBAL.API + '/course-options/';

    var factory = {
        query: function() {
            return $http.get(url);
        },

        get: function(courseId, examOptionId) {
            if (courseId && examOptionId) {
                return $http.get(url + courseId + "/" + examOptionId);
            } else {
                return null;
            }
        },

        create: function(courseOption, callback) {
            if (courseOption) {
                return $http.post(url, courseOption).then(function(response) {
                    if (callback) {
                        callback();
                    }
                    return response.data;
                }, function(response) {
                    return {
                        status: response.status,
                        error: response.data
                    };
                });
            } else {
                return null;
            }
        },
        delete: function(courseId, examOptionId, callback) {
            if (courseId && examOptionId) {
                return $http.delete(url + courseId + "/" + examOptionId);
            } else {
                return null;
            }
        }
    };

    return factory;
});
