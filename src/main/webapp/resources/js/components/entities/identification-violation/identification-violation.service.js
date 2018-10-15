/**
 * This is the factory definition for the IdentificationViolation Data Service. This defines how to handle data about IdentificationViolation objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */


(function() {
    'use strict';

    angular
        .module('IdentificationViolationService', [])
        .factory('IdentificationViolation', identificationViolationFactory);

    identificationViolationFactory.$inject = ['$http', 'GLOBAL'];

    function identificationViolationFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/id-violations/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            delete: deleteById,
            save: save
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the IdentificationViolation from the API collection.
         *
         * @return {IdentificationViolation} An array of IdentificationViolation objects.
         */
        function getAll(options) {
            var reqParams = {};
            if (options) {
                if (options.page) {
                    reqParams.page = options.page;
                }
                if (options.size) {
                    reqParams.size = options.size;
                }
            }
            //			return $http.get(url, {params: reqParams});
            return $http.get(url);
        }


        /**
         * This method is used to retrieve an instance of a IdentificationViolation from the API collection.
         * @param  {int} id of the IdentificationViolation object that is to be retrieved.
         * @return {IdentificationViolation} An IdentificationViolation object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an IdentificationViolation object in the database by POSTing the
         * required data to the API.
         *
         * @param  {IdentificationViolation} identificationViolation An IdentificationViolation object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no identificationViolation data is provided then the method returns null.
         */
        function create(identificationViolation, callback) {
            if (identificationViolation) {
                return $http.post(url, identificationViolation).then(function(response) {
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
         * This method is used to delete an instance of a IdentificationViolation from the API collection.
         * @param  {int} id of the IdentificationViolation object that is to be deleted. 
         * @return {IdentificationViolation} An IdentificationViolation object as identified by the id.
         */
        function deleteById(id) {
            if (id) {
                return $http.delete(url + id);
            } else {
                return null;
            }
        }
        /**
         * This method is used to save changes to an existing IdentificationViolation object.
         *
         * @param  {IdentificationViolation} identificationViolation An IdentificationViolation object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no identificationViolation data is provided then the method returns null.
         */
        function save(identificationViolation, callback) {
            if (identificationViolation && identificationViolation.id) {
                return $http.put(url + identificationViolation.id, identificationViolation).then(function(response) {
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
