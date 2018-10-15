angular.module('OptionService', []).factory('Option', function($http, GLOBAL) {
    var self = this;
    var url = GLOBAL.API + '/examOptions/';

    var factory = {
        query: function(examBoardId, examYear, examSeries, page, size, sort) {
            var request = '?';
            var pageable = false;
            if (examBoardId && examBoardId !== 0) {
                request += 'examBoardId=' + examBoardId + '&';
            }
            if (examYear && examYear !== '') {
                request += 'examYear=' + examYear + '&';
            }
            if (examSeries && examSeries !== '') {
                request += 'examSeries=' + examSeries + '&';
            }
            if (page && page !== 0) {
                pageable = true;
                request += 'page=' + page + '&';
            }
            if (size && size !== 0) {
                pageable = true;
                request += 'size=' + size + '&';
            }
            if (sort && sort !== 0) {
                pageable = true;
                request += 'sort=' + sort + '&';
            }
            if (pageable) {
                return $http.get(url + '/paged' + request);
            } else {
                return $http.get(url + request);
            }
        },

        search: function(search) {
            if (search) {
                var request = '?';
                if (search.optionEntryCode) {
                    request += 'optionEntryCode=' + search.optionEntryCode;
                }
                return $http.get(url + 'search' + request);
            } else {
                return null;
            }
        },

        queryBySyllabus: function(id) {
            if (id) {
                return $http.get(url + 'syllabus?syllabusId=' + id);
            } else {
                return null;
            }
        },

        create: function(option, callback) {
            if (option) {
                return $http.post(url, option).then(function(response) {
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

        save: function(option, callback) {
            if (option) {
                return $http.put(url + option.examOptionId, option).then(function(response) {
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
