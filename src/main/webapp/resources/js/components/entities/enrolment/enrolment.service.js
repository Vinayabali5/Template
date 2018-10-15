/**
 * This is the factory definition for the Enrolment Data Service. This defines how to handle data about Enrolment objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('EnrolmentService', [])
        .factory('Enrolment', enrolmentFactory);

    enrolmentFactory.$inject = ['$http', 'GLOBAL'];

    function enrolmentFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/enrolments/';
        // Public Interface
        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        //Private Interface
        /**
         * This method is used to retrieve all the Enrolment from the API collection.
         *
         * @return {Enrolment} An array of Enrolment objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a Enrolment from the API collection.
         * @param  {int} id of the Enrolment object that is to be retrieved. 
         * @return {Enrolment} An Enrolment object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an Enrolment object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Enrolment} enrolment An Enrolment object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Enrolment data is provided then the method returns null.
         */
        function create(enrolment, callback) {
            if (enrolment) {
                return $http.post(url, enrolment).then(function(response) {
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
         * This method is used to save changes to an existing Enrolment object.
         *
         * @param  {Enrolment} enrolment An Enrolment object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Enrolment data is provided then the method returns null.
         */
        function save(enrolment, callback) {
            if (enrolment && enrolment.enrolmentId) {
                return $http.put(url + enrolment.enrolmentId, enrolment).then(function(response) {
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
