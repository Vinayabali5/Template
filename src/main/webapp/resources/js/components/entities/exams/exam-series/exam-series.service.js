angular.module('ExamSeriesService', ['ngResource']).factory('ExamSeries', function($http, $resource, GLOBAL, APP) {
    var self = this;
    var url = GLOBAL.API + '/exam-series/';

    var factory = {
        query: function(examBoardId, page, size, sort) {
            var yearId = APP.getYear().id;
            var request = '?';
            var pageable = false;
            if (examBoardId && examBoardId !== 0) {
                request += 'examBoardId=' + examBoardId + '&';
            }
            if (page && page !== 0) {
                pageable = true;
                request += 'page=' + page + '&';
            }
            if (size && size !== 0) {
                pageable = true;
                request += 'size=' + size + '&';
            }
            if (sort && sort !== '') {
                pageable = true;
                request += 'sort=' + sort + '&';
            }
            if (pageable) {
                return $http.get(url + '/paged' + request, {
                    params: {
                        yearId: yearId
                    }
                });
            } else {
                return $http.get(url + request, {
                    params: {
                        yearId: yearId
                    }
                });
            }
        },

        get: function(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        },

        create: function(examSeries, callback) {
            if (examSeries) {
                return $http.post(url, examSeries).then(function(response) {
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

        save: function(examSeries, callback) {
            if (examSeries) {
                return $http.put(url + examSeries.id, examSeries).then(function(response) {
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
        }

    };

    return factory;
});
