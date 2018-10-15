angular.module('SyllabusService', []).factory('Syllabus', function($http, GLOBAL) {
    var self = this;
    var url = GLOBAL.API + '/syllabi/';

    var factory = {
        query: function(options) {
            // expects: options : {yearId, examBoardId, examYear, examSeries, page, size, sort}
            var request = '?';
            var pageable = false;
            if (options.yearId && options.yearId !== 0) {
                request += 'yearId=' + options.yearId + '&';
            }
            if (options.examBoardId && options.examBoardId !== 0) {
                request += 'examBoardId=' + options.examBoardId + '&';
            }
            if (options.syllabusCode && options.syllabusCode !== '') {
                request += 'syllabusCode=' + options.syllabusCode + '&';
            }
            if (options.examYear && options.examYear !== '') {
                request += 'examYear=' + options.examYear + '&';
            }
            if (options.examSeries && options.examSeries !== '') {
                request += 'examSeries=' + options.examSeries + '&';
            }
            if (options.page && options.page !== 0) {
                pageable = true;
                request += 'page=' + options.page + '&';
            }
            if (options.size && options.size !== 0) {
                pageable = true;
                request += 'size=' + options.size + '&';
            }
            if (options.sort && options.sort !== '') {
                pageable = true;
                request += 'sort=' + options.sort + '&';
            }
            if (pageable) {
                return $http.get(url + '/paged' + request);
            } else {
                if (options.yearId && options.yearId !== 0) {
                    return $http.get(url + request);
                } else {
                    return $http.get(GLOBAL.API + '/search/exam-syllabus' + request);
                }
            }
        },

        get: function(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        },

        create: function(syllabus, callback) {
            if (syllabus) {
                return $http.post(url, syllabus).then(function(response) {
                    if (callback) {
                        callback(response);
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

        save: function(syllabus, callback) {
            if (syllabus) {
                return $http.put(url + syllabus.id, syllabus).then(function(response) {
                    if (callback) {
                        callback(response);
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
