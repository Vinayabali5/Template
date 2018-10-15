/**
 * This is the factory definition for the CourseGroup Data Service. This defines how to handle data about CourseGroup objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */
(function() {
    'use strict';

    angular
        .module('CourseGroupService', [])
        .factory('CourseGroup', courseGroupFactory);

    courseGroupFactory.$inject = ['$http', '$rootScope', 'GLOBAL'];

    function courseGroupFactory($http, $rootScope, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/courseGroups/';
        var params = '';
        // Public Interface
        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save,
            getByYear: getByYear
        };

        return factory;

        //Private Interface
        /**
         * This method is used to retrieve all the CourseGroup from the API collection.
         *
         * @return {CourseGroup} An array of CourseGroup objects.
         */
        function getAll() {
            params = '';
            if ($rootScope.currentYear) {
                params = '?year=' + $rootScope.currentYear.code;
            }
            return $http.get(url + params);
        }

        /**
         * This method is used to retrieve an instance of a CourseGroup from the API collection.
         * @param  {int} id of the CourseGroup object that is to be retrieved. 
         * @return {CourseGroup} An CourseGroup object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an CourseGroup object in the database by POSTing the
         * required data to the API.
         *
         * @param  {CourseGroup} CourseGroup An CourseGroup object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no CourseGroup data is provided then the method returns null.
         */
        function create() {
            if (courseGroup) {
                return $http.post(url, courseGroup).then(function(response) {
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
         * This method is used to save changes to an existing CourseGroup object.
         *
         * @param  {CourseGroup} CourseGroup An CourseGroup object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no CourseGroup data is provided then the method returns null.
         */
        function save() {
            if (courseGroup && courseGroup.id) {
                return $http.put(url + courseGroup.id, courseGroup).then(function(response) {
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
         * This method is used to retrieve all the CourseGroup from the API collection.
         * @param {year} Request Parameter
         * @return {CourseGroup} An array of CourseGroup objects valid for year.
         */
        function getByYear(year) {
            return $http.get(url, {
                params: {
                    yearId: year.id
                }
            });
        }

    }


})();
