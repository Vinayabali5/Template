/**
 * This is the factory definition for the StudentLearningSupport Data Service. This defines how to handle data about StudentLearningSupport objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */
(function() {
    'use strict';

    angular
        .module('StudentLearningSupportService', [])
        .factory('StudentLearningSupport', studentLearningSupportFactory);

    studentLearningSupportFactory.$inject = ['$http', 'GLOBAL'];

    function studentLearningSupportFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/students/';
        var factory = {
            query: getAll,
            get: getById,
            save: save
        };
        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the StudentLearningSupport from the API collection.
         *
         * @return {StudentLearningSupport} An array of StudentLearningSupport objects.
         */
        function getAll() {
            return $http.get(url);
        }
        /**
         * This method is used to retrieve an instance of a StudentLearningSupport of a Student from the API collection.
         * @param  {int} studentId of the Student object that is to be retrieved. 
         * @return {StudentLearningSupport} An StudentLearningSupport object as identified by the studentId.
         */
        function getById(studentId) {
            if (studentId) {
                return $http.get(url + studentId + '/learningSupport');
            } else {
                return null;
            }
        }

        function save(studentLearningSupport, callback) {
            if (studentLearningSupport && studentLearningSupport.studentId) {
                return $http.put(url + studentLearningSupport.studentId + '/learningSupport', studentLearningSupport).then(function(response) {
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
    }
})();
