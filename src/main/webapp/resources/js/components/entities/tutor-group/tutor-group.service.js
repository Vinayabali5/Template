/**
 * This is the factory definition for the TutorGroup Data Service. This defines how to handle data about TutorGroup objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */
(function() {
    'use strict';

    angular
        .module('TutorGroupService', [])
        .factory('TutorGroup', tutorGroupFactory);

    tutorGroupFactory.$inject = ['$http', 'GLOBAL'];

    function tutorGroupFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/tutorGroups/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save,
            getValid: getValid,
        };

        return factory;

        // Private Interface

        /**
         * This method is used to retrieve all the TutorGroup from the API collection.
         *
         * @return {TutorGroup} An array of TutorGroup objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a TutorGroup from the API collection.
         * @param  {int} id of the TutorGroup object that is to be retrieved. 
         * @return {TutorGroup} An TutorGroup object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an TutorGroup object in the database by POSTing the
         * required data to the API.
         *
         * @param  {TutorGroup} tutorGroup An TutorGroup object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no tutorGroup data is provided then the method returns null.
         */
        function create(tutorGroup, callback) {
            if (tutorGroup) {
                return $http.post(url, tutorGroup).then(function(response) {
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
         * This method is used to save changes to an existing TutorGroup object.
         *
         * @param  {TutorGroup} tutorGroup An TutorGroup object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no tutorGroup data is provided then the method returns null.
         */
        function save(tutorGroup, callback) {
            if (tutorGroup && tutorGroup.id) {
                return $http.put(url + tutorGroup.id, tutorGroup).then(function(response) {
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
         * This method is used to retrieve all the  Valid TutorGroup from the API collection.
         *
         * @return {TutorGroup} An array of TutorGroup objects.
         */
        function getValid(inUse) {
            return $http.get(url, {
                params: {
                    inUse: inUse
                }
            });
        }
    }

})();
