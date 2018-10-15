/**
 * This is the factory definition for the PossibleGradeSet Data Service. This defines how to handle data about PossibleGradeSet objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('PossibleGradeSetService', [])
        .factory('PossibleGradeSet', possibleGradeSetFactory);

    possibleGradeSetFactory.$inject = ['$http', 'GLOBAL'];

    function possibleGradeSetFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/possibleGradeSets/';

        var factory = {
            query: getAll,
            get: getById,
            getPossibleGrades: getPossibleGradeSetId,
            create: create,
            save: save
        };

        return factory;

        /**
         * This method is used to retrieve all the PossibleGradeSet from the API collection.
         *
         * @return {PossibleGradeSet} An array of PossibleGradeSet objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a PossibleGradeSet from the API collection.
         * @param  {int} id of the PossibleGradeSet object that is to be retrieved. 
         * @return {PossibleGradeSet} An PossibleGradeSet object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to retrieve an instance of a PossibleGradeSet from the API collection.
         * @param  {int} id of the PossibleGradeSet object that is to be retrieved. 
         * @return {PossibleGradeSet} An array of PossibleGradeSet object as identified by the id.
         */
        function getPossibleGradeSetId(id) {
            return $http.get(url + id + '/possibleGrades');
        }

        /**
         * This method is used to create a new instance of an PossibleGradeSet object in the database by POSTing the
         * required data to the API.
         *
         * @param  {PossibleGradeSet} possibleGradeSet An PossibleGradeSet object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no PossibleGradeSet data is provided then the method returns null.
         */
        function create(possibleGradeSet, callback) {
            if (possibleGradeSet) {
                return $http.post(url, possibleGradeSet).then(function(response) {
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
         * This method is used to save changes to an existing PossibleGradeSet object.
         *
         * @param  {PossibleGradeSet} possibleGradeSet An PossibleGradeSet object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no PossibleGradeSet data is provided then the method returns null.
         */
        function save(possibleGradeSet, callback) {
            if (possibleGradeSet && possibleGradeSet.id) {
                return $http.put(url + possibleGradeSet.id, possibleGradeSet).then(function(response) {
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
