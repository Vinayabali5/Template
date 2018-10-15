/**
 * This is the factory definition for the Person Data Service. This defines how to handle data about Person objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('PersonService', [])
        .factory('Person', personFactory);

    personFactory.$inject = ['$http', 'GLOBAL'];

    function personFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/people/';
        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save,
            contacts: getContactsById,
            notes: getNotesById
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the Person from the API collection.
         *
         * @return {Person} An array of Person objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a Person from the API collection.
         * @param  {int} id of the Person object that is to be retrieved.
         * @return {Person} An Person object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an Person object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Person} Person An Person object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Person data is provided then the method returns null.
         */
        function create(person, callback) {
            if (person) {
                return $http.post(url, person).then(function(response) {
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
         * This method is used to save changes to an existing Person object.
         *
         * @param  {Person} Person An Person object with the data to be updated.
         * @param  {Function} successCallback
         * @param  {Function} failureCallback  A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Person data is provided then the method returns null.
         */
        function save(person, successCallback, failureCallback) {
            if (person && person.id) {
                return $http.put(url + person.id, person).then(function(response) {
                    if (successCallback) {
                        successCallback();
                    }
                    return response.data;
                }, function(response) {
                    if (failureCallback) {
                        failureCallback();
                    }
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
         * This method is used to get Contacts for a Person with personId from the API collection.
         *
         * @param  {int} personId of the Person to retrieve the contacts for.
         * @return {Person} An array of contacts
         */
        function getContactsById(personId) {
            if (personId !== undefined && personId !== null) {
                return $http.get(url + personId + '/contacts');
            } else {
                return null;
            }
        }

        /**
         * This method is used to get Notes for a Person with personId from the API collection.
         *
         * @param  {int} personId of the Person to retrieve the notes for.
         * @return {Person} An array of notes
         */
        function getNotesById(personId) {
            if (personId !== undefined && personId !== null) {
                return $http.get(url + personId + '/notes');
            } else {
                return null;
            }
        }




    }
})();
