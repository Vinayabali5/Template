/**
 * This is the factory definition for the Staff Data Service. This defines how to handle data about Staff objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('StaffService', [
            'cid.app.constants',
            'cid.app.variables'
        ])
        .factory('Staff', staffFactory);

    staffFactory.$inject = ['$http', 'GLOBAL', 'APP'];

    function staffFactory($http, GLOBAL, APP) {
        var MAX_RETURN = 9999;
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/staff/';

        var staffList = [];

        var factory = {
            query: getAll,
            queryPage: getAllByPage,
            get: getById,
            create: create,
            save: save,
            getTimetable: getTimetable,
            getCourseGroups: getCourseGroups
        };

        return factory;

        /**
         * This method is used to retrieve all the Staff from the API collection.
         *
         * @return {Staff} An array of Staff objects.
         */
        function getAll(current) {
            if (current === undefined) {
                current = true;
            }
            var request = '';
            if (current) {
                request += '?current=1&page=0&size=' + MAX_RETURN + '&sort=person.surname,ASC';
            } else {
                request += 'all/';
            }
            return $http.get(url + request);
        }

        function getAllByPage(page, size, sort) {
            var request = '?current=1&';
            if (page && page !== 0) {
                request += 'page=' + page + '&';
            }
            if (size && size !== 0) {
                request += 'size=' + size + '&';
            } else {
                request += 'size=' + MAX_RETURN + '&';
            }
            if (sort && sort !== '') {
                request += 'sort=' + sort + '&';
            }
            return $http.get(url + request);
        }

        /**
         * This method is used to retrieve an instance of a Staff from the API collection.
         * @param  {int} id of the Staff object that is to be retrieved.
         * @return {Staff} An Staff object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an Staff object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Staff} Staff An staff object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Staff data is provided then the method returns null.
         */
        function create(staff, callback) {
            if (staff) {
                return $http.post(url, staff).then(function(response) {
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
         * This method is used to save changes to an existing Staff object.
         *
         * @param  {Staff} Staff An staff object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Staff data is provided then the method returns null.
         */
        function save(staff, callback) {
            if (staff && staff.id) {
                return $http.put(url + staff.id, staff).then(function(response) {
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
         * This method is used to retrieve the timetable data for the supplied staffId.
         *
         * @param  {Integer} staffId the ID for a memeber of staff
         * @return {promise}         a promise to the staff timetable API
         */
        function getTimetable(staffId) {
            year = APP.getYear();
            if (staffId !== undefined && staffId !== null) {
                return $http.get(url + staffId + '/timetable', {
                    params: {
                        yearId: year.id
                    }
                });
            } else {
                return null;
            }
        }

        /**
         * This method is used to retrieve the course groups data for the supplied staffId.
         *
         * @param  {Integer} staffId the ID for a memeber of staff
         * @return {promise}         a promise to the staff course-groups API
         */
        function getCourseGroups(staffId) {
            year = APP.getYear();
            if (staffId !== undefined && staffId !== null) {
                return $http.get(url + staffId + '/course-groups', {
                    params: {
                        yearId: year.id
                    }
                });
            } else {
                return null;
            }
        }

    }
})();
