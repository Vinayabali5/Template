/**
 * This is the factory definition for the textLookup Data Service. This defines how to handle data about textLookup objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */


(function() {
    'use strict';

    angular
        .module('TextLookupService', [])
        .factory('TextLookup', textLookupFactory);

    textLookupFactory.$inject = ['$http', 'GLOBAL'];

    function textLookupFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/text-lookup/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the textLookup from the API collection.
         *
         * @return {textLookup} An array of textLookup objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a textLookup from the API collection.
         * @param  {int} id of the textLookup object that is to be retrieved.
         * @return {textLookup} An textLookup object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an textLookup object in the database by POSTing the
         * required data to the API.
         *
         * @param  {textLookup} textLookup An textLookup object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no textLookup data is provided then the method returns null.
         */
        function create(textLookup, callback) {
            if (textLookup) {
                return $http.post(url, textLookup).then(function(response) {
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
         * This method is used to save changes to an existing textLookup object.
         *
         * @param  {textLookup} textLookup An textLookup object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no textLookup data is provided then the method returns null.
         */
        function save(textLookup, callback) {
            if (textLookup && textLookup.id) {
                return $http.put(url + textLookup.id, textLookup).then(function(response) {
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
