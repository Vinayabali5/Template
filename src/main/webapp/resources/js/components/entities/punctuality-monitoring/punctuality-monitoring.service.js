/**
 * This is the factory definition for the PunctualityMonitoring Data Service. This defines how to handle data about PunctualityMonitoring objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('PunctualityMonitoringService', ['ui-notification'])
        .factory('PunctualityMonitoring', punctualityMonitoringFactory);

    punctualityMonitoringFactory.$inject = ['$http', 'GLOBAL', 'Notification'];

    function punctualityMonitoringFactory($http, GLOBAL, Notification) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/punctualityMonitorings/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the PunctualityMonitoring from the API collection.
         *
         * @return {PunctualityMonitoring} An array of PunctualityMonitoring objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a PunctualityMonitoring from the API collection.
         * @param  {int} id of the PunctualityMonitoring object that is to be retrieved. 
         * @return {PunctualityMonitoring} An PunctualityMonitoring object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an PunctualityMonitoring object in the database by POSTing the
         * required data to the API.
         *
         * @param  {PunctualityMonitoring} punctualityMonitoring An PunctualityMonitoring object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no PunctualityMonitoring data is provided then the method returns null.
         */
        function create(punctualityMonitoring, callback) {
            if (punctualityMonitoring) {
                return $http.post(url, punctualityMonitoring).then(function(response) {
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
         * This method is used to save changes to an existing PunctualityMonitoring object.
         *
         * @param  {PunctualityMonitoring} punctualityMonitoring An PunctualityMonitoring object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no PunctualityMonitoring data is provided then the method returns null.
         */
        function save(punctualityMonitoring, callback) {
            if (punctualityMonitoring && punctualityMonitoring.id) {
                return $http.put(url + punctualityMonitoring.id, punctualityMonitoring).then(function(response) {
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
/*

(function() {

	angular.module('PunctualityMonitoringService', [])
	.factory('PunctualityMonitoring', function($http, GLOBAL) {
		var self = this;
		var url = GLOBAL.API + '/punctualityMonitorings/';

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
			create: function(punctualityMonitoring, callback) {
				if (punctualityMonitoring) {
					return $http.post(url, punctualityMonitoring).then(function(response) {
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
			save: function(punctualityMonitoring, callback) {
				if (punctualityMonitoring && punctualityMonitoring.id) {
					return $http.put(url + punctualityMonitoring.id, punctualityMonitoring).then(function(response) {
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
