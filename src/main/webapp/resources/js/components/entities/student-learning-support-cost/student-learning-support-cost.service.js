/**
 * This is the factory definition for the StudentLearningSupportCost Data Service. This defines how to handle data about StudentLearningSupportCost objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('StudentLearningSupportCostService', [])
        .factory('LearningSupportCost', studentLearningSupportCostFactory);

    studentLearningSupportCostFactory.$inject = ['$http', 'GLOBAL'];

    function studentLearningSupportCostFactory($http, GLOBAL) {
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
         * This method is used to retrieve all the StudentLearningSupportCost from the API collection.
         *
         * @return {StudentLearningSupportCost} An array of StudentLearningSupportCost objects.
         */
        function getAll() {
            return $http.get(url + 'learningSupportCosts');
        }

        /**
         * This method is used to retrieve an instance of a StudentLearningSupportCost from the API collection.
         * @param  {int} id of the StudentLearningSupportCost object that is to be retrieved. 
         * @return {StudentLearningSupportCost} An StudentLearningSupportCost object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + 'learningSupportCosts/' + id);
            } else {
                return null;
            }
        }

        function getByStudent(id) {
            if (id) {
                return $http.get(url + 'students/' + id + '/learningSupportCosts');
            } else {
                return null;
            }
        }


        /**
         * This method is used to create a new instance of an StudentLearningSupportCost object in the database by POSTing the
         * required data to the API.
         *
         * @param  {StudentLearningSupportCost} studentLearningSupportCost An StudentLearningSupportCost object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no StudentLearningSupportCost data is provided then the method returns null.
         */
        function create(studentLearningSupportCost, callback) {
            if (studentLearningSupportCost) {
                return $http.post(url + 'learningSupportCosts', studentLearningSupportCost).then(function(response) {
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
         * @param  {StudentLearningSupportCost} studentLearningSupportCost An StudentLearningSupportCost object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no School data is provided then the method returns null.
         */
        function save(studentLearningSupportCost, callback) {
            if (studentLearningSupportCost && studentLearningSupportCost.id) {
                return $http.put(url + 'learningSupportCosts/' + studentLearningSupportCost.id, studentLearningSupportCost).then(function(response) {
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
