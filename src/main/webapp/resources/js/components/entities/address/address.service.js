/**
 * This is the factory definition for the Address Data Service. This defines how to handle data about Address objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */
(function() {
    'use strict';

    angular
        .module('AddressService', [])
        .factory('Address', addressFactory);

    addressFactory.$inject = ['$http', 'GLOBAL'];

    function addressFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/addresses/';

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
         * This method is used to retrieve all the Address from the API collection.
         *
         * @return {Address} An array of Address objects.
         */
        function getAll() {
            return $http.get(url);
        }


        /**
         * This method is used to retrieve an instance of a Address from the API collection.
         * @param  {int} addressId that is to be retrieved.
         * @return {Address} An Address object as identified by the addressId.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an Address object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Address} address An Address object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Address data is provided then the method returns null.
         */
        function create(address, callback) {
            if (address) {
                return $http.post(url, address).then(function(response) {
                    if (callback) {
                        callback(response.data);
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
         * This method is used to save changes to an existing Address object.
         *
         * @param  {Address} address An Address object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Address data is provided then the method returns null.
         */
        function save(address, callback) {
            if (address && address.id) {
                return $http.put(url + address.id, address).then(
                    function(response) {
                        if (callback) {
                            callback(response.data);
                        }
                        return response.data;
                    },
                    function(response) {
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
