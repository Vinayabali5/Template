/**
 * This is the factory definition for the ContactType Data Service. This defines how to handle data about ContactTypeService objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('ContactTypeService', [])
        .factory('ContactType', contactTypeFactory);

    contactTypeFactory.$inject = ['$http', 'GLOBAL'];

    function contactTypeFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/contactTypes/';
        //Public Interface
        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        //Private Interface
        /**
         * This method is used to retrieve all the ContactType from the API collection.
         *
         * @return {ContactTypeService} An array of ContactType objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a ContactType from the API collection.
         * @param  {int} id of the ContactType object that is to be retrieved. 
         * @return {ContactTypeService} An ContactType object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an ContactType object in the database by POSTing the
         * required data to the API.
         *
         * @param  {ContactType} contactType An ContactType object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no ContactType data is provided then the method returns null.
         */
        function create(contactType, callback) {
            if (contactType) {
                return $http.post(url, contactType).then(function(response) {
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
         * This method is used to save changes to an existing ContactType object.
         *
         * @param  {ContactType} contactType An ContactType object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no ContactType data is provided then the method returns null.
         */
        function save(contactType, callback) {
            if (contactType && contactType.id) {
                return $http.put(url + contactType.id, contactType).then(function(response) {
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
