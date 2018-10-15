/**
 * This is the factory definition for the StudentLearningSupportVisit Data Service. This defines how to handle data about StudentLearningSupportVisit objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('StudentLearningSupportVisitService', [])
        .factory('LearningSupportVisit', studentLearningSupportVisitFactory);

    studentLearningSupportVisitFactory.$inject = ['$http', 'GLOBAL'];

    function studentLearningSupportVisitFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/';

        var factory = {
            query: getAll,
            get: getById,
            getByStudent: getByStudent,
            create: create,
            save: save
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the StudentLearningSupportVisit from the API collection.
         *
         * @return {StudentLearningSupportVisit} An array of StudentLearningSupportVisit objects.
         */
        function getAll() {
            return $http.get(url + 'learningSupportVisits');
        }

        /**
         * This method is used to retrieve an instance of a StudentLearningSupportVisit from the API collection.
         * @param  {int} id of the StudentLearningSupportVisit object that is to be retrieved. 
         * @return {StudentLearningSupportVisit} An StudentLearningSupportVisit object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + 'learningSupportVisits/' + id);
            } else {
                return null;
            }
        }

        function getByStudent(id) {
            if (id) {
                return $http.get(url + 'students/' + id + '/learningSupportVisits');
            } else {
                return null;
            }
        }


        /**
         * This method is used to create a new instance of an StudentLearningSupportVisit object in the database by POSTing the
         * required data to the API.
         *
         * @param  {StudentLearningSupportVisit} studentLearningSupportVisit An StudentLearningSupportVisit object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no StudentLearningSupportVisit data is provided then the method returns null.
         */
        function create(studentLearningSupportVisit, callback) {
            if (studentLearningSupportVisit) {
                return $http.post(url + 'learningSupportVisits', studentLearningSupportVisit).then(function(response) {
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
         * This method is used to save changes to an existing School object.
         *
         * @param  {StudentLearningSupportVisit} studentLearningSupportVisit An StudentLearningSupportVisit object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no School data is provided then the method returns null.
         */
        function save(studentLearningSupportVisit, callback) {
            if (studentLearningSupportVisit && studentLearningSupportVisit.id) {
                return $http.put(url + 'learningSupportVisits/' + studentLearningSupportVisit.id, studentLearningSupportVisit).then(function(response) {
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
