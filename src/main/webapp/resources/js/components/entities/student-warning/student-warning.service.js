/**
 * This is the factory definition for the StudentWarning Data Service. This defines how to handle data about StudentWarning objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('StudentWarningService', [])
        .factory('StudentWarning', studentWarningFactory);

    studentWarningFactory.$inject = ['$http', 'GLOBAL', 'APP'];

    function studentWarningFactory($http, GLOBAL, APP) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/students/';

        var factory = {
            query: getAll,
            get: getByStudentId,
            getStudentWarning: getByStudent,
            save: save
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the StudentWarning from the API collection.
         *
         * @return {StudentWarning} An array of StudentWarning objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a StudentWarning from the API collection.
         * @param  {int} studentId of the StudentWarning object that is to be retrieved. 
         * @return {StudentWarning} An StudentWarning object as identified by the studentId.
         */
        function getByStudent(studentId) {
            year = APP.getYear();
            if (studentId !== null) {
                return $http.get(url + studentId + '/warning-code-changes', {
                    params: {
                        yearId: year.id
                    }
                });
            } else {
                return null;
            }
        }

        /**
         * This method is used to retrieve an instance of a StudentWarning from the API collection.
         * @param  {int} studentId of the StudentWarning object that is to be retrieved. 
         * @return {StudentWarning} An StudentWarning object as identified by the studentId.
         */
        function getByStudentId(studentId) {
            if (studentId) {
                return $http.get(url + studentId + '/warnings');
            } else {
                return null;
            }
        }

        /**
         * This method is used to save changes to an existing StudentWarning object.
         *
         * @param  {StudentWarning} studentWarning An StudentWarning object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no studentWarning data is provided then the method returns null.
         */
        function save(studentWarning, callback) {
            if (studentWarning && studentWarning.studentId) {
                return $http.put(url + studentWarning.studentId + '/warnings', studentWarning).then(function(response) {
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
