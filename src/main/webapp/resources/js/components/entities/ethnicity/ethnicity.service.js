/**
 * This is the factory definition for the Ethnicity Data Service. This defines how to handle data about Ethnicity objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('EthnicityService', [])
        .factory('Ethnicity', ethinicityFactory);

    ethinicityFactory.$inject = ['$http', 'GLOBAL'];

    function ethinicityFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/ethnicities/';
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
         * This method is used to retrieve all the Ethnicity from the API collection.
         *
         * @return {Ethnicity} An array of Ethnicity objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a Ethnicity from the API collection.
         * @param  {int} id of the Ethnicity object that is to be retrieved. 
         * @return {Ethnicity} An Ethnicity object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }


        /**
         * This method is used to create a new instance of an Ethnicity object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Ethnicity} ethnicity An Ethnicity object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Ethnicity data is provided then the method returns null.
         */
        function create(ethnicity, callback) {
            if (ethnicity) {
                return $http.post(url, ethnicity).then(function(response) {
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
         * This method is used to save changes to an existing Ethnicity object.
         *
         * @param  {Ethnicity} ethnicity An Ethnicity object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Ethnicity data is provided then the method returns null.
         */
        function save(ethnicity, callback) {
            if (ethnicity && ethnicity.id) {
                return $http.put(url + ethnicity.id, ethnicity).then(function(response) {
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
