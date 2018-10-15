/**
 * This is the factory definition for the AttendanceCode Data Service. This defines how to handle data about AttendanceCode objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('AttendanceCodeService', [])
        .factory('AttendanceCode', attendanceCodeFactory);

    attendanceCodeFactory.$inject = ['$http', 'GLOBAL'];

    function attendanceCodeFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/attendanceCodes/';

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
         * This method is used to retrieve all the AttendanceCode from the API collection.
         *
         * @return {AttendanceCode} An array of AttendanceCode objects.
         */
        function getAll() {
            return $http.get(url);
        }


        /**
         * This method is used to retrieve an instance of a AttendanceCode from the API collection.
         * @param  {int} id of the AttendanceCode object that is to be retrieved. 
         * @return {AttendanceCode} An AttendanceCode object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an AttendanceCode object in the database by POSTing the
         * required data to the API.
         *
         * @param  {AttendanceCode} attendanceCode An AttendanceCode object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no AttendanceCode data is provided then the method returns null.
         */
        function create(attendanceCode, callback) {
            if (attendanceCode) {
                return $http.post(url, attendanceCode).then(function(response) {
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
         * This method is used to save changes to an existing AttendanceCode object.
         *
         * @param  {AttendanceCode} attendanceCode An AttendanceCode object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no AttendanceCode data is provided then the method returns null.
         */
        function save(attendanceCode, callback) {
            if (attendanceCode && attendanceCode.id) {
                return $http.put(url + attendanceCode.id, attendanceCode).then(function(response) {
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




/*(function() {

	angular.module('AttendanceCodeService', [])
	.factory('AttendanceCode', function($http, GLOBAL) {
		var self = this;
		var url = GLOBAL.API + '/attendanceCodes/';

		var factory = {
			query: function() {
				return $http.get(url);
			},
			get: function(id) {
				if (id) {
					return $http.get(url + id);
				} else {
					return null;
				}
			},
			create: function(attendanceCode, callback) {
				if (attendanceCode) {
					return $http.post(url, attendanceCode).then(function(response) {
						if (callback) { callback(); }
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
			},
			save: function(attendanceCode, callback) {
				if (attendanceCode && attendanceCode.id) {
					return $http.put(url + attendanceCode.id, attendanceCode).then(function(response) {
						if (callback) { callback(); }
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

		};

		return factory;
	});

}());
*/
