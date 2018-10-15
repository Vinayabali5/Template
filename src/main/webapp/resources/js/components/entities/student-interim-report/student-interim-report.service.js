/**
 * This is the factory definition for the StudentInterimReport Data Service. This defines how to handle data about StudentInterimReport objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('StudentInterimReportService', [])
        .factory('StudentInterimReport', studentInterimReportFactory);

    studentInterimReportFactory.$inject = ['$http', 'GLOBAL'];

    function studentInterimReportFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/students/';

        var factory = {
            query: getAll,
            get: getById

        };

        return factory;


        /**
         * This method is used to retrieve all the StudentInterimReport from the API collection.
         *
         * @return {StudentInterimReport} An array of StudentInterimReport objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve a collection of a StudentInterimReport of a Student from the API collection.
         * @param  {int} studentId of the StudentInterimReport object that is to be retrieved. 
         * @return {StudentInterimReport} An An array of StudentInterimReports object as identified by the studentId.
         */
        function getById(studentId) {
            if (studentId) {
                return $http.get(url + studentId + '/interimReports');
            } else {
                return null;
            }
        }

    }

})();
