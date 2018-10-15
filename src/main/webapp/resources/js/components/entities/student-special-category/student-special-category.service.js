/**
 * This is the factory definition for the StudentSpecialCategory Data Service. This defines how to handle data about StudentSpecialCategory objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */


(function() {
    'use strict';

    angular
        .module('StudentSpecialCategoryService', [])
        .factory('StudentSpecialCategory', studentSpecialCatergoryFactory);

    studentSpecialCatergoryFactory.$inject = ['$http', 'GLOBAL'];

    function studentSpecialCatergoryFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/';

        var factory = {
            query: getAll,
            get: getById,
            getForm: getFormByStudentId,
            getCompleteForm: getCompleteFormByStudentId,
            create: create,
            save: save
        };
        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the StudentSpecialCategory from the API collection.
         *
         * @return {StudentSpecialCategory} An array of StudentSpecialCategory objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a StudentSpecialCategory from the API collection.
         * @param  {int} id of the StudentSpecialCategory object that is to be retrieved. 
         * @return {StudentSpecialCategory} An StudentSpecialCategory object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + 'studentSpecialCategories/' + id);
            } else {
                return null;
            }
        }

        function getFormByStudentId(studentId) {
            return $http.get(url + 'students/' + studentId + '/specialCategories');
        }


        function getCompleteFormByStudentId(studentId) {
            return $http.get(url + 'students/' + studentId + '/specialCategoriesForm');
        }
        /**
         * This method is used to create a new instance of an StudentSpecialCategory object in the database by POSTing the
         * required data to the API.
         *
         * @param  {StudentSpecialCategory} studentSpecialCategory An StudentSpecialCategory object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no studentSpecialCategory data is provided then the method returns null.
         */
        function create(studentSpecialCategory, callback) {
            if (studentSpecialCategory) {
                return $http.post(url + 'studentSpecialCategories', studentSpecialCategory).then(function(response) {
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
         * This method is used to save changes to an existing StudentSpecialCategory object.
         *
         * @param  {StudentSpecialCategory} StudentSpecialCategory An StudentSpecialCategory object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no StudentSpecialCategory data is provided then the method returns null.
         */
        function save(studentSpecialCategory, callback) {
            if (studentSpecialCategory && studentSpecialCategory.id) {
                return $http.put(url + 'studentSpecialCategories/' + studentSpecialCategory.id, studentSpecialCategory).then(function(response) {
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
