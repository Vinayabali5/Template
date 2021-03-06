/**
 * This is the factory definition for the Destination Data Service. This defines how to handle data about Destination objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('DestinationService', [])
        .factory('Destination', destinationFactory);

    destinationFactory.$inject = ['$http', 'GLOBAL'];

    function destinationFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/destinations/';
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
         * This method is used to retrieve all the Destination from the API collection.
         *
         * @return {Destination} An array of Destination objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a Destination from the API collection.
         * @param  {int} id of the Destination object that is to be retrieved. 
         * @return {Destination} An Destination object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an Destination object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Destination} destination An Destination object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Destination data is provided then the method returns null.
         */
        function create(destination, callback) {
            if (destination) {
                return $http.post(url, destination).then(function(response) {
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
         * This method is used to save changes to an existing Destination object.
         *
         * @param  {Destination} destination An Destination object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Destination data is provided then the method returns null.
         */
        function save(destination, callback) {
            if (destination && destination.id) {
                return $http.put(url + destination.id, destination).then(function(response) {
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
