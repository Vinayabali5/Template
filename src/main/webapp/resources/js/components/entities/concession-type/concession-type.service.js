/**
 * This is the factory definition for the ConcessionType Data Service. This defines how to handle data about ConcessionType objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('ConcessionTypeService', ['ui-notification'])
        .factory('ConcessionType', concessionTypeFactory);

    concessionTypeFactory.$inject = ['$http', 'GLOBAL', 'Notification'];

    function concessionTypeFactory($http, GLOBAL, Notification) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/concessionTypes/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the ConcessionType from the API collection.
         *
         * @return {ConcessionType} An array of ConcessionType objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a ConcessionType from the API collection.
         * @param  {int} id of the ConcessionType object that is to be retrieved. 
         * @return {ConcessionType} An ConcessionType object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an ConcessionType object in the database by POSTing the
         * required data to the API.
         *
         * @param  {ConcessionType} concessionType An ConcessionType object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no ConcessionType data is provided then the method returns null.
         */
        function create(concessionType, callback) {
            if (concessionType) {
                return $http.post(url, concessionType).then(function(response) {
                    if (callback) {
                        callback();
                    }
                    return response.data;
                }, function(response) {
                    Notification.error("Error:" + response.data.message);
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
         * This method is used to save changes to an existing ConcessionType object.
         *
         * @param  {ConcessionType} concessionType An ConcessionType object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no ConcessionType data is provided then the method returns null.
         */
        function save(concessionType, callback) {
            if (concessionType && concessionType.id) {
                return $http.put(url + concessionType.id, concessionType).then(function(response) {
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
