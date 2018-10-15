/**
 * This is the factory definition for the Note Data Service. This defines how to handle data about Note objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('NoteService', [])
        .factory('Note', noteFactory);

    noteFactory.$inject = ['$http', 'GLOBAL'];

    function noteFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/notes/';

        var factory = {
            query: getAll,
            get: getById,
            getByPersonId: getByPersonId,
            create: create,
            save: save
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the Note from the API collection.
         *
         * @return {Note} An array of Note objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a Note from the API collection.
         * @param  {int} id of the Note object that is to be retrieved.
         * @return {Note} An Note object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to retrieve an instance of a Note from the API collection.
         * @param  {int} personId of the Note object that is to be retrieved.
         * @return {Note} An Note object as identified by the id.
         */
        function getByPersonId(personId) {
            if (personId) {
                return $http.get(url + personId + '/notes');
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an Note object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Note} note An Note object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Note data is provided then the method returns null.
         */
        function create(note, callback) {
            if (note !== undefined) {
                return $http.post(url, note).then(function(response) {
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
         * This method is used to save changes to an existing Note object.
         *
         * @param  {Note} note An Note object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Note data is provided then the method returns null.
         */
        function save(note, callback) {
            if (note !== undefined && note.id) {
                return $http.put(url + note.id, note).then(function(response) {
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
