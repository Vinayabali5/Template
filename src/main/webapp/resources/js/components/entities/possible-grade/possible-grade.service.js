/**
 * This is the factory definition for the PossibleGrade Data Service. This defines how to handle data about PossibleGrade objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('PossibleGradeService', [])
        .factory('PossibleGrade', possibleGradeFactory);

    possibleGradeFactory.$inject = ['$http', 'GLOBAL'];

    function possibleGradeFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/possibleGrades/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;

        /**
         * This method is used to retrieve all the PossibleGrade from the API collection.
         *
         * @return {PossibleGrade} An array of PossibleGrade objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a PossibleGrade from the API collection.
         * @param  {int} id of the PossibleGrade object that is to be retrieved. 
         * @return {PossibleGrade} An PossibleGrade object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

        /**
         * This method is used to create a new instance of an PossibleGrade object in the database by POSTing the
         * required data to the API.
         *
         * @param  {PossibleGrade} possibleGrade An PossibleGrade object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no PossibleGrade data is provided then the method returns null.
         */
        function create(possibleGrade, callback) {
            if (possibleGrade) {
                return $http.post(url, possibleGrade).then(function(response) {
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
         * This method is used to save changes to an existing PossibleGrade object.
         *
         * @param  {PossibleGrade} possibleGrade An PossibleGrade object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no PossibleGrade data is provided then the method returns null.
         */
        function save(possibleGrade, callback) {
            if (possibleGrade && possibleGrade.id) {
                return $http.put(url + possibleGrade.id, possibleGrade).then(function(response) {
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
