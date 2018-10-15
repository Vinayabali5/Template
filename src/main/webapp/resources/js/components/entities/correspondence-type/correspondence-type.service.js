/**
 * This is the factory definition for the CorrespondenceType Data Service. This defines how to handle data about CorrespondenceService objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('CorrespondenceTypeService', [])
        .factory('CorrespondenceType', correspondenceTypeFactory);

    correspondenceTypeFactory.$inject = ['$http', 'GLOBAL'];

    function correspondenceTypeFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/correspondenceTypes/';
        //Public Factory
        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;
        //Private Interface
        /**
         * This method is used to retrieve all the CorrespondenceType from the API collection.
         *
         * @return {CorrespondenceType} An array of CorrespondenceType objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a CorrespondenceType from the API collection.
         * @param  {int} id of the CorrespondenceType object that is to be retrieved. 
         * @return {CorrespondenceType} An CorrespondenceType object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an CorrespondenceType object in the database by POSTing the
         * required data to the API.
         *
         * @param  {CorrespondenceType} correspondenceType An CorrespondenceType object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no CorrespondenceType data is provided then the method returns null.
         */
        function create(correspondenceType, callback) {
            if (correspondenceType) {
                return $http.post(url, correspondenceType).then(function(response) {
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
         * This method is used to save changes to an existing CorrespondenceType object.
         *
         * @param  {CorrespondenceType} correspondenceType An CorrespondenceType object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no CorrespondenceType data is provided then the method returns null.
         */
        function save(correspondenceType, callback) {
            if (correspondenceType && correspondenceType.id) {
                return $http.put(url + correspondenceType.id, correspondenceType).then(function(response) {
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
