/**
 * This is the factory definition for the FundingModel Data Service. This defines how to handle data about FundingModel objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('FundingModelService', [])
        .factory('FundingModel', fundingModelFactory);

    fundingModelFactory.$inject = ['$http', 'GLOBAL'];

    function fundingModelFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/fundingModels/';
        //Public Interface
        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the FundingModel from the API collection.
         *
         * @return {FundingModel} An array of FundingModel objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a FundingModel from the API collection.
         * @param  {int} id of the FundingModel object that is to be retrieved. 
         * @return {FundingModel} An FundingModel object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an FundingModel object in the database by POSTing the
         * required data to the API.
         *
         * @param  {FundingModel} fundingModel An FundingModel object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no FundingModel data is provided then the method returns null.
         */
        function create(fundingModel, callback) {
            if (fundingModel) {
                return $http.post(url, fundingModel).then(function(response) {
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
         * This method is used to save changes to an existing FundingModel object.
         *
         * @param  {FundingModel} fundingModel An FundingModel object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no FundingModel data is provided then the method returns null.
         */
        function save(fundingModel, callback) {
            if (fundingModel && fundingModel.id) {
                return $http.put(url + fundingModel.id, fundingModel).then(function(response) {
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

	angular.module('FundingModelService', [])
	.factory('FundingModel', function($http, GLOBAL) {
		var self = this;
		var url = GLOBAL.API + '/fundingModels/';

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
			create: function(fundingModel, callback) {
				if (fundingModel) {
					return $http.post(url, fundingModel).then(function(response) {
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
			save: function(fundingModel, callback) {
				if (fundingModel && fundingModel.id) {
					return $http.put(url + fundingModel.id, fundingModel).then(function(response) {
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
