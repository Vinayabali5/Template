/**
 * This is the factory definition for the Subject Data Service. This defines how to handle data about Subject objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */


(function() {
    'use strict';

    angular
        .module('SubjectService', [])
        .factory('Subject', subjectFactory);

    subjectFactory.$inject = ['$http', 'GLOBAL'];

    function subjectFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/subjects/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the Subject from the API collection.
         *
         * @return {Subject} An array of Subject objects.
         */
        function getAll(options) {
            var reqParams = {};
            if (options) {
                if (options.page) {
                    reqParams.page = options.page;
                }
                if (options.size) {
                    reqParams.size = options.size;
                }
            }
            //			return $http.get(url, {params: reqParams});
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a Subject from the API collection.
         * @param  {int} id of the Subject object that is to be retrieved. 
         * @return {Subject} An Subject object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an Subject object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Subject} subject An Subject object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no subject data is provided then the method returns null.
         */
        function create(subject, callback) {
            if (subject) {
                return $http.post(url, subject).then(function(response) {
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
         * This method is used to save changes to an existing Subject object.
         *
         * @param  {Subject} subject An Subject object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no subject data is provided then the method returns null.
         */
        function save(subject, callback) {
            if (subject && subject.id) {
                return $http.put(url + subject.id, subject).then(function(response) {
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
