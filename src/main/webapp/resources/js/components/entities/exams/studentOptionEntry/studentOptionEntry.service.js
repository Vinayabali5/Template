(function() {

    angular.module('StudentOptionEntryService', [])
        .factory('StudentOptionEntry', function($http, GLOBAL, APP) {
            var self = this;
            var url = GLOBAL.API + '/';

            var factory = {
                query: function() {
                    return $http.get(url + 'studentOptionEntries');
                },
                markExamAmendment: function(studentId, callback) {
                    return $http.post(url + 'students/' + studentId + '/examAmendmentsRequired').then(function(response) {
                        if (callback) {
                            callback(response.data);
                        }
                        return response.data;
                    }, function(response) {
                        return {
                            status: response.status,
                            error: response.data
                        };
                    });
                },
                getId: function(studentId) {
                    var year = APP.getYear();
                    return $http.get(url + 'students/' + studentId + '/optionEntries', {
                        params: {
                            yearId: year.id
                        }
                    });
                },
                getByOptionId: function(studentId, examOptionId) {
                    return $http.get(url + 'students/' + studentId + '/optionEntries/' + examOptionId);
                },
                delete: function(studentId, examOptionId, callback) {
                    return $http.delete(url + 'students/' + studentId + '/optionEntries/' + examOptionId).then(function(response) {
                        if (callback) {
                            callback(response.data);
                        }
                        return response.data;
                    }, function(response) {
                        return {
                            status: response.status,
                            error: response.data
                        };
                    });
                },
                create: function(studentOptionEntry, callback) {
                    if (studentOptionEntry.studentId) {
                        return $http.post(url + 'students/' + studentOptionEntry.studentId + '/optionEntries', studentOptionEntry).then(function(response) {
                            if (callback) {
                                callback(response.data);
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
                save: function(studentId, examOptionId, data, callback) {
                    if (studentId && examOptionId) {
                        return $http.put(url + 'students/' + studentId + '/optionEntries/' + examOptionId, data).then(function(response) {
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

}());
