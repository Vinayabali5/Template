/**
 * This is the factory definition for the Contact Data Service. This defines how to handle data about ContactService objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('ContactService', [])
        .factory('Contact', contactFactory);

    contactFactory.$inject = ['$http', 'GLOBAL'];

    function contactFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/contacts/';
        // Public Interface
        var factory = {
            query: getAll,
            search: searchByPersonId,
            get: getById,
            delete: deleteById,
            contacts: contactsByPersonId,
            create: create,
            save: save,
            deleteAddress: deleteAddress
        };

        return factory;
        //Private Interface
        /**
         * This method is used to retrieve all the Contact from the API collection.
         *
         * @return {Contact} An array of ContactService objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a Contact from the API collection.
         * @param  {int} personId of the Contact object that is to be retrieved. 
         * @return {Contact} An Contact object as identified by the personId.
         */
        function searchByPersonId(personId) {
            return $http.get(url + personId);
        }
        /**
         * This method is used to retrieve an instance of a Contact from the API collection.
         * @param  {int} id of the Contact object that is to be retrieved. 
         * @return {Contact} An Contact object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }
        /**
         * This method is used to delete an instance of a Contact from the API collection.
         * @param  {int} id of the Contact object that is to be deleted. 
         * @return {Contact} An Contact object as identified by the id.
         */
        function deleteById(id) {
            if (id) {
                return $http.delete(url + id);
            } else {
                return null;
            }
        }
        /**
         * This method is used to retrieve an instance of a Contact from the API collection.
         * @param  {int} personId of the Contact object that is to be retrieved. 
         * @return {Contact} An Contact object as identified by the id.
         */
        function contactsByPersonId(personId) {
            return $http.get(url + personId + '/contacts');
        }
        /**
         * This method is used to create a new instance of an Contact object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Contact} contact An Contact object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Contact data is provided then the method returns null.
         */
        function create(contact, callback) {
            if (contact) {
                return $http.post(url, contact).then(function(response) {
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
         * This method is used to save changes to an existing Contact object.
         *
         * @param  {Contact} contact An Contact object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Contact data is provided then the method returns null.
         */
        function save(contact, callback) {
            if (contact && contact.id) {
                return $http.put(url + contact.id, contact).then(function(response) {
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
         * This method is used to delete Address from an existing Contact object.
         *
         * @param  {Contact} contact An Contact object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Contact data is provided then the method returns null.
         */
        function deleteAddress(contact, callback) {
            if (contact && contact.id) {
                return $http.put(url + contact.id + '/address', contact).then(function(response) {
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
