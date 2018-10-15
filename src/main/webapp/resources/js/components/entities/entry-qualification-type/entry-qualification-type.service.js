/**
 * This is the factory definition for the EntryQualificationType Data Service. This defines how to handle data about EntryQualificationType objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('EntryQualificationTypeService', [])
        .factory('EntryQualificationType', entryQualifiactionTypeFactory);

    entryQualifiactionTypeFactory.$inject = ['$http', 'GLOBAL'];

    function entryQualifiactionTypeFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/entryQualificationTypes/';
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
         * This method is used to retrieve all the EntryQualificationType from the API collection.
         *
         * @return {EntryQualificationType} An array of EntryQualificationType objects.
         */
        function getAll() {
            return $http.get(url);
        }


        /**
         * This method is used to retrieve an instance of a EntryQualificationType from the API collection.
         * @param  {int} id of the EntryQualificationType object that is to be retrieved. 
         * @return {EntryQualificationType} An EntryQualificationType object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an EntryQualificationType object in the database by POSTing the
         * required data to the API.
         *
         * @param  {EntryQualificationType} entryQualificationType An EntryQualificationType object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no EntryQualificationType data is provided then the method returns null.
         */
        function create(entryQualificationType, callback) {
            if (entryQualificationType) {
                return $http.post(url, entryQualificationType).then(function(response) {
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
         * This method is used to save changes to an existing EntryQualificationType object.
         *
         * @param  {EntryQualificationType} entryQualificationType An EntryQualificationType object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no EntryQualificationType data is provided then the method returns null.
         */
        function save(entryQualificationType, callback) {
            if (entryQualificationType && entryQualificationType.id) {
                return $http.put(url + entryQualificationType.id, entryQualificationType).then(function(response) {
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
