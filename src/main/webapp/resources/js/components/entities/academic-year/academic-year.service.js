/**
 * This is the factory definition for the AcademicYear Data Service. This defines how to handle data about AcademicYear objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */
(function() {
    'use strict';

    angular
        .module('AcademicYearService', ['ui-notification'])
        .factory('AcademicYear', academicYearFactory);

    academicYearFactory.$inject = ['$http', 'GLOBAL', 'Notification'];

    function academicYearFactory($http, GLOBAL, Notification) {
        // Variable and Constants
        var url = GLOBAL.API + '/academic-years/';

        // Public Interface
        var factory = {
            query: getAll,
            get: getById,
            getCurrent: getCurrent,
            create: create,
            save: save

        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the AcademicYears from the API collection.
         *
         * @return {AcademicYear} An array of AcademicYear objects.
         */
        function getAll() {
            return $http.get(url);
        }
        /**
         * This method returns an individual AcademicYear object from the API based on the ID supplied.
         *
         * @param  {int} id The ID for the AcademicYear object to retrieve.
         * @return {AcademicYear} An AcademicYear object representation for year idefieid by the ID supplied.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method returns the "Current" AcademicYear.
         *
         * @return {AcademicYear} An AcademicYear object that represents the current academic year.
         */
        function getCurrent() {
            return $http.get(url + 'current');
        }

        /**
         * This method is used to create a new instance of an AcademicYear object in the database by POSTing the
         * required data to the API.
         *
         * @param  {AcademicYear} academicYear An AcademicYear object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depnding on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no AcademicYear data is provided then the method returns null.
         */
        function create(academicYear, callback) {
            if (academicYear) {
                return $http.post(url, academicYear).then(function(response) {
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
         * This method is used to save changes to an existing AcademicYear object.
         *
         * @param  {AcademicYear} academicYear An AcademicYear object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depnding on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no AcademicYear data is provided then the method returns null.
         */
        function save(academicYear, callback) {
            if (academicYear && academicYear.id) {
                return $http.put(url + academicYear.id, academicYear).then(function(response) {
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
