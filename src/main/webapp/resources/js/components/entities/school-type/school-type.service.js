/**
 * This is the factory definition for the SchoolType Data Service. This defines how to handle data about SchoolType objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('SchoolTypeService', [])
        .factory('SchoolType', schoolTypeFactory);

    schoolTypeFactory.$inject = ['$http', 'GLOBAL'];

    function schoolTypeFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var self = this;
        var url = GLOBAL.API + '/schoolTypes/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the SchoolType from the API collection.
         *
         * @return {SchoolType} An array of SchoolType objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a SchoolType from the API collection.
         * @param  {int} id of the SchoolType object that is to be retrieved. 
         * @return {SchoolType} An SchoolType object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }


        /**
         * This method is used to create a new instance of an SchoolType object in the database by POSTing the
         * required data to the API.
         *
         * @param  {SchoolType} schoolType An SchoolType object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no SchoolType data is provided then the method returns null.
         */
        function create(schoolType, callback) {
            if (schoolType) {
                return $http.post(url, schoolType).then(function(response) {
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
         * This method is used to save changes to an existing School object.
         *
         * @param  {SchoolType} schoolType An SchoolType object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no School data is provided then the method returns null.
         */
        function save(schoolType, callback) {
            if (schoolType && schoolType.id) {
                return $http.put(url + schoolType.id, schoolType).then(function(response) {
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
