/**
 * This is the factory definition for the LetterType Data Service. This defines how to handle data about LetterType objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('LetterTypeService', [])
        .factory('LetterType', letterTypeFactory);

    letterTypeFactory.$inject = ['$http', 'GLOBAL'];

    function letterTypeFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/letterTypes/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save,
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the LetterType from the API collection.
         *
         * @return {LetterType} An array of LetterType objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a LetterType from the API collection.
         * @param  {int} id of the LetterType object that is to be retrieved. 
         * @return {LetterType} An LetterType object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an LetterType object in the database by POSTing the
         * required data to the API.
         *
         * @param  {LetterType} letterType An LetterType object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no LetterType data is provided then the method returns null.
         */
        function create(letterType, callback) {
            if (letterType) {
                return $http.post(url, letterType).then(function(response) {
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
         * This method is used to save changes to an existing LetterType object.
         *
         * @param  {LetterType} letterType An LetterType object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no LetterType data is provided then the method returns null.
         */
        function save(letterType, callback) {
            if (letterType && letterType.id) {
                return $http.put(url + letterType.id, letterType).then(function(response) {
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
