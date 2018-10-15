/**
 * This is the factory definition for the AcademicYear Data Service. This defines how to handle data about AcademicYear objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */
(function() {
    'use strict';

    angular
        .module('ApplicationStatusService', [])
        .factory('ApplicationStatus', applicationStatusFactory);

    applicationStatusFactory.$inject = ['$http', 'GLOBAL'];

    function applicationStatusFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/applicationStatuses/';

        //Public Interface
        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        //Private Interface
        /**
         * This method is used to retrieve all the ApplicationStatus from the API collection.
         *
         * @return {ApplicationStatus} An array of ApplicationStatus objects.
         */
        function getAll() {
            return $http.get(url);
        }


        /**
         * This method returns an individual ApplicationStatus object from the API based on the ID supplied.
         *
         * @param  {int} id The ID for the ApplicationStatus object to retrieve.
         * @return {ApplicationStatus} An ApplicationStatus Object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an ApplicationStatus object in the database by POSTing the
         * required data to the API.
         *
         * @param  {ApplicationStatus} applicationStatus An ApplicationStatus object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no ApplicationStatus data is provided then the method returns null.
         */
        function create(applicationStatus, callback) {
            if (applicationStatus) {
                return $http.post(url, applicationStatus).then(function(response) {
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


        /**
         * This method is used to save changes to an existing ApplicationStatus object.
         *
         * @param  {ApplicationStatus} applicationStatus An ApplicationStatus object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no ApplicationStatus data is provided then the method returns null.
         */
        function save(applicationStatus, callback) {
            if (applicationStatus && applicationStatus.id) {
                return $http.put(url + applicationStatus.id, applicationStatus).then(function(response) {
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
