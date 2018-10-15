/**
 * This is the factory definition for the Course Data Service. This defines how to handle data about Course objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('CourseService', [])
        .factory('Course', courseFactory);

    courseFactory.$inject = ['$http', 'GLOBAL', 'APP'];

    function courseFactory($http, GLOBAL, APP) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/courses/';
        var endpoints = {
            courseGroups: '/courseGroups',
            enrolments: '/enrolments'
        };

        // Public Interface

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save,
            courseGroups: getCourseGroupsById,
            getByYear: getByYear,
            enrolments: getEnrolmentsByCourseId
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the Course from the API collection.
         *
         * @return {Course} An array of Course objects.
         */
        function getAll() {
            var year = APP.getYear();
            return $http.get(url, {
                params: {
                    yearId: year.id
                }
            });
        }

        /**
         * This method is used to retrieve an instance of a Course from the API collection.
         * @param  {int} id of the Course object that is to be retrieved.
         * @return {Course} An Course object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }
        /**
         * This method is used to create a new instance of an Course object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Course} Course An Course object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Course data is provided then the method returns null.
         */
        function create(course, callback) {
            if (course) {
                return $http.post(url, course).then(function(response) {
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
         * This method is used to save changes to an existing Course object.
         *
         * @param  {Course} Course An Course object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Course data is provided then the method returns null.
         */
        function save(course, callback) {
            if (course && course.id) {
                return $http.put(url + course.id, course).then(function(response) {
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
         * This method is used to retrieve the Course Groups of a Course from the API collection.
         * @param  {int} courseId of the Course object that is to be retrieved.
         * @return {Course} An Course object as identified by the id.
         */
        function getCourseGroupsById(courseId) {
            var year = APP.getYear();
            if (courseId) {
                return $http.get(url + courseId + endpoints.courseGroups, {
                    params: {
                        yearId: year.id
                    }
                });
            }
        }


        /**
         * This method is used to retrieve the Course of a Year from the API collection.
         * @param  {AcademicYaer} year of the Course object that is to be retrieved.
         * @return {Course} List of Course valid for a year
         */
        function getByYear(year) {
            return $http.get(url, {
                params: {
                    yearId: year.id
                }
            });
        }

        function getEnrolmentsByCourseId(courseId) {
            if (courseId) {
                var year = APP.getYear();
                return $http.get(url + courseId + endpoints.enrolments, {
                    params: {
                        year: year.code
                    }
                });
            }
        }
    }
})();
