/**
 * This is the factory definition for the BlockService Data Service. This defines how to handle data about BlockService objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('BlockService', [])
        .factory('Block', blockFactory);

    blockFactory.$inject = ['$http', 'GLOBAL'];

    function blockFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/blocks/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        //Private Interface
        /**
         * This method is used to retrieve all the BlockService from the API collection.       *
         * @return {BlockService} An array of BlockService objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a BlockService from the API collection.
         * @param  {int} id of the BlockService object that is to be retrieved. 
         * @return {BlockService} An BlockService object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an BlockService object in the database by POSTing the
         * required data to the API.
         *
         * @param  {BlockService} block An BlockService object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no BlockService data is provided then the method returns null.
         */
        function create(block, callback) {
            if (block) {
                return $http.post(url, block).then(function(response) {
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
         * This method is used to save changes to an existing BlockService object.
         *
         * @param  {BlockService} block An BlockService object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no BlockService data is provided then the method returns null.
         */
        function save(block, callback) {
            if (block && block.id) {
                return $http.put(url + block.id, block).then(function(response) {
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
