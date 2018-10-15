/**
 * This is the factory definition for the LetterTemplate Service.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('LetterTemplateService', [])
        .factory('LetterTemplate', letterTemplateService);

    letterTemplateService.$inject = ['$http', 'GLOBAL'];

    function letterTemplateService($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/letterTemplates/';

        var factory = {
            query: getAll,
            get: getById,
            save: save,
            create: create
        };

        return factory;


        /**
         * This method is used to retrieve an instance of a LetterTemplate from the API collection.
         * @param  {int} id of the Gender object that is to be retrieved. 
         * @return {LetterTemplate} An Gender object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }


        /**
         * This method is used to retrieve all the LetterTemplate from the API collection.
         *
         * @return {LetterTemplate} An array of LetterTemplate objects.
         */
        function getAll() {
            return $http.get(url, {
                params: {
                    showAll: 'true'
                }
            });
        }



        /**
         * This method is used to save changes to an existing Gender object.
         *
         * @param  {LetterTemplate} gender An LetterTemplate object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no LetterTemplate data is provided then the method returns null.
         */
        function save(letterTemplate, callback) {
            if (letterTemplate && letterTemplate.id) {
                return $http.put(url + letterTemplate.id, letterTemplate).then(function(response) {
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
         * This method is used to create a new instance of an LetterTemplate object in the database by POSTing the
         * required data to the API.
         *
         * @param  {LetterTemplate} gender An Gender object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no LetterTemplate data is provided then the method returns null.
         */
        function create(letterTemplate, callback) {
            if (letterTemplate) {
                return $http.post(url, letterTemplate).then(function(response) {
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
