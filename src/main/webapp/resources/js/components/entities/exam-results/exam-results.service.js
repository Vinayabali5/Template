/**
 * This is the factory definition for the Exam Results Service . This defines how to handle data about Results objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular.module('ExamResultsService', [])
        .factory('ExamResults', resultsFactory);

    resultsFactory.$inject = ['$http', 'GLOBAL'];

    function resultsFactory($http, GLOBAL) {
        // Variables and Constants
        var url = GLOBAL.API + '/students/';

        //Public Interface
        var factory = {
            getByStudent: getByStudent,
            get: getById,
            save: save
        };

        return factory;

        //Private 
        /**
         * This method is used to retrieve all the Result of Student id from the API collection.
         * @param  studentId
         * @return {Results} An array of Results objects.
         */
        function getByStudent(studentId) {
            if (studentId) {
                return $http.get(url + studentId + '/exam-results');
            } else
                return null;
        }


        /**
         * This method is used to retrieve an instance of Result object 
         * @param resultId -  result identifier
         * @return {Results} An instance of Result object.
         */
        function getById(resultId) {
            if (resultId) {
                return $http.get(url + 'exam-results/' + resultId);
            } else {
                return null;
            }
        }


        /**
         * This method is used to save an instance of Result object 
         * @param examResult- Results object that is to be saved
         * @return {Results} An instance of Result object saved
         */
        function save(examResult, callback) {
            if (examResult && examResult.id) {
                return $http.put(url + 'exam-results/' + examResult.id, examResult).then(function(response) {
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
            } else
                return null;
        }

    }


})();
