/**
 * This is the factory definition for the SchoolPriority Data Service. This defines how to handle data about SchoolPriority objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('SchoolPriorityService', [])
        .factory('SchoolPriority', schoolPriorityFactory);

    schoolPriorityFactory.$inject = ['$http', 'GLOBAL'];

    function schoolPriorityFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/schoolPriorities/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the SchoolPriority from the API collection.
         *
         * @return {SchoolPriority} An array of SchoolPriority objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a SchoolPriority from the API collection.
         * @param  {int} id of the SchoolPriority object that is to be retrieved. 
         * @return {SchoolPriority} An SchoolPriority object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }


        /**
         * This method is used to create a new instance of an SchoolPriority object in the database by POSTing the
         * required data to the API.
         *
         * @param  {SchoolPriority} schoolPriority An SchoolPriority object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no SchoolPriority data is provided then the method returns null.
         */
        function create(schoolPriority, callback) {
            if (schoolPriority) {
                return $http.post(url, schoolPriority).then(function(response) {
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
         * This method is used to save changes to an existing SchoolPriority object.
         *
         * @param  {SchoolPriority} schoolPriority An SchoolPriority object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no SchoolPriority data is provided then the method returns null.
         */
        function save(schoolPriority, callback) {
            if (schoolPriority && schoolPriority.id) {
                return $http.put(url + schoolPriority.id, schoolPriority).then(function(response) {
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
