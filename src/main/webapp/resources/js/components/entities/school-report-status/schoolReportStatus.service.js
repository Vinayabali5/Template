/**
 * This is the factory definition for the SchoolReportStatus Data Service. This defines how to handle data about SchoolReportStatus objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('SchoolReportStatusService', [])
        .factory('SchoolReportStatus', schoolReportStatusFactory);

    schoolReportStatusFactory.$inject = ['$http', 'GLOBAL'];

    function schoolReportStatusFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/schoolReportStatuses/';

        var factory = {
            query: getAll,
            get: getById,
            save: save
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the SchoolReportStatus from the API collection.
         *
         * @return {SchoolReportStatus} An array of SchoolReportStatus objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a SchoolReportStatus from the API collection.
         * @param  {int} id of the SchoolReportStatus object that is to be retrieved. 
         * @return {SchoolReportStatus} An SchoolReportStatus object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }


        /**
         * This method is used to save changes to an existing SchoolReportStatus object.
         *
         * @param  {schoolReportStatus} SchoolReportStatus An SchoolReportStatus object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no SchoolReportStatus data is provided then the method returns null.
         */
        function save(schoolReportStatus, callback) {
            if (schoolReportStatus && schoolReportStatus.id) {
                return $http.put(url + schoolReportStatus.id, schoolReportStatus).then(function(response) {
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
