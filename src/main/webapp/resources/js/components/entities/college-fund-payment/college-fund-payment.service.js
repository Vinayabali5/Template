/**
 * This is the factory definition for the CollegeFundPayment Data Service. This defines how to handle data about CollegeFundPayment objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('CollegeFundPaymentService', [])
        .factory('CollegeFundPayment', collegeFundPaymentFactory);

    collegeFundPaymentFactory.$inject = ['$http', 'GLOBAL'];

    function collegeFundPaymentFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/';

        var factory = {
            query: getAll,
            get: getById,
            getByStudent: getByStudentId,
            create: create,
            save: save
        };

        return factory;

        //Private Interface
        /**
         * This method is used to retrieve all the CollegeFundPayment from the API collection.
         *
         * @return {CollegeFundPayment} An array of CollegeFundPayment objects.
         */
        function getAll() {
            return $http.get(url);
        }


        /**
         * This method is used to retrieve an instance of a CollegeFundPayment from the API collection.
         * @param  {int} id of the CollegeFundPayment object that is to be retrieved. 
         * @return {CollegeFundPayment} An CollegeFundPayment object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + 'collegeFundPayments/' + id);
            } else {
                return null;
            }

        }


        /**
         * This method is used to retrieve an instance of a CollegeFundPayment from the API collection.
         * @param  {int} studentId of the Student of whose the CollegeFundPayment object is to be retrieved. 
         * @return {CollegeFundPayment} An CollegeFundPayment object of Student of studentId.
         */
        function getByStudentId(studentId) {
            if (studentId) {
                return $http.get(url + 'students/' + studentId + '/collegeFundPayments');
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an CollegeFundPayment object in the database by POSTing the
         * required data to the API.
         *
         * @param  {CollegeFundPayment} collegeFundPayment An CollegeFundPayment object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no CollegeFundPayment data is provided then the method returns null.
         */
        function create(collegeFundPayment, callback) {
            if (collegeFundPayment) {
                return $http.post(url + 'collegeFundPayments', collegeFundPayment).then(function(response) {
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
         * This method is used to save changes to an existing CollegeFundPayment object.
         *
         * @param  {CollegeFundPayment} collegeFundPayment An CollegeFundPayment object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no CollegeFundPayment data is provided then the method returns null.
         */
        function save(collegeFundPayment, callback) {
            if (collegeFundPayment && collegeFundPayment.id) {
                return $http.put(url + 'collegeFundPayments/' + collegeFundPayment.id, collegeFundPayment).then(function(response) {
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
