/**
 * This is the factory definition for the CollegeFundPaid Data Service. This defines how to handle data about CollegeFundPaid objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */


(function() {
    'use strict';

    angular
        .module('CollegeFundPaidService', [])
        .factory('CollegeFundPaid', collegeFundFactory);

    collegeFundFactory.$inject = ['$http', 'GLOBAL'];

    function collegeFundFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/collegeFundPaids/';
        // Public
        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };


        return factory;

        //Private Interface
        /**
         * This method is used to retrieve all the CollegeFundPaid from the API collection.
         *
         * @return {CollegeFundPaid} An array of CollegeFundPaid objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a CollegeFundPaid from the API collection.
         * @param  {int} id of the CollegeFundPaid object that is to be retrieved. 
         * @return {CollegeFundPaid} An CollegeFundPaid object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }


        /**
         * This method is used to create a new instance of an CollegeFundPaid object in the database by POSTing the
         * required data to the API.
         *
         * @param  {CollegeFundPaid} collegeFundPaid An CollegeFundPaid object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no CollegeFundPaid data is provided then the method returns null.
         */
        function create(collegeFundPaid, callback) {
            if (collegeFundPaid) {
                return $http.post(url, collegeFundPaid).then(function(response) {
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
         * This method is used to save changes to an existing CollegeFundPaid object.
         *
         * @param  {CollegeFundPaid} collegeFundPaid An CollegeFundPaid object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no CollegeFundPaid data is provided then the method returns null.
         */
        function save(collegeFundPaid, callback) {
            if (collegeFundPaid && collegeFundPaid.id) {
                return $http.put(url + collegeFundPaid.id, collegeFundPaid).then(function(response) {
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
