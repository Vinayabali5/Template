/**
 * This is the factory definition for the StudentEntryQualification Data Service. This defines how to handle data about StudentEntryQualification objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('StudentEntryQualificationService', [])
        .factory('StudentEntryQualification', studentEntryQualificationFactory);

    studentEntryQualificationFactory.$inject = ['$http', 'GLOBAL'];

    function studentEntryQualificationFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/';
        //Public Interface
        var factory = {
            query: getAll,
            get: getById,
            entryQualification: getEntryQualification,
            delete: deleteById,
            create: create,
            save: save
        };
        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the StudentEntryQualification from the API collection.
         *
         * @return {StudentEntryQualification} An array of StudentEntryQualification objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an collection of StudentEntryQualification entities from the API collection.
         * @param  {int} studentEntryQualificationId of the StudentEntryQualification object that is to be retrieved. 
         * @return {StudentEntryQualification} An StudentEntryQualification object as identified by the id.
         */
        function getById(studentEntryQualificationId) {
            if (studentEntryQualificationId) {
                return $http.get(url + 'students/' + studentEntryQualificationId + '/entryQualifications');
            } else {
                return null;
            }
        }

        /**
         * This method is used to retrieve an instance of a StudentEntryQualification from the API collection.
         * @param  {int} studentEntryQualificationId of the StudentEntryQualification object that is to be retrieved. 
         * @return {StudentEntryQualification} An StudentEntryQualification object as identified by the id.
         */
        function getEntryQualification(studentEntryQualificationId) {
            return $http.get(url + 'studentEntryQualifications/' + studentEntryQualificationId);
        }

        /**
         * This method is used to delete an instance of a StudentEntryQualification from the API collection.
         * @param  {int} studentEntryQualificationId of the StudentEntryQualification object that is to be retrieved. 
         * @return {StudentEntryQualification} An StudentEntryQualification object as identified by the studentEntryQualificationId.
         */
        function deleteById(studentEntryQualificationId) {
            if (studentEntryQualificationId) {
                return $http.delete(url + 'studentEntryQualifications/' + studentEntryQualificationId);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an StudentEntryQualification object in the database by POSTing the
         * required data to the API.
         *
         * @param  {StudentEntryQualification} studentEntryQualification An StudentEntryQualification object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no studentEntryQualification data is provided then the method returns null.
         */
        function create(studentEntryQualification, callback) {
            if (studentEntryQualification) {
                return $http.post(url + 'studentEntryQualifications', studentEntryQualification).then(function(response) {
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
         * This method is used to save changes to an existing StudentEntryQualification object.
         *
         * @param  {StudentEntryQualification} studentEntryQualification An StudentEntryQualification object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no studentEntryQualification data is provided then the method returns null.
         */
        function save(studentEntryQualification, callback) {
            if (studentEntryQualification && studentEntryQualification.studentEntryQualificationId) {
                return $http.put(url + 'studentEntryQualifications/' + studentEntryQualification.studentEntryQualificationId, studentEntryQualification).then(function(response) {
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
