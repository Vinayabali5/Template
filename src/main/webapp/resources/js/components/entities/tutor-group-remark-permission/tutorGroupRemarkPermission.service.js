/**
 * This is the factory definition for the StudentYear Data Service. This defines how to handle data about StudentYear objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */
(function() {
    'use strict';

    angular
        .module('TutorGroupRemarkPermissionService', [])
        .factory('StudentYear', studentYearFactory);

    studentYearFactory.$inject = ['$http', 'GLOBAL'];

    function studentYearFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/tutorGroups/';
        var factory = {
            query: getAll,
            get: getById
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the StudentYear from the API collection.
         *
         * @return {StudentYear} An array of StudentYear objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a StudentYear from the API collection.
         * @param  {int} id of the StudentYear object that is to be retrieved. 
         * @return {StudentYear} An StudentYear object as identified by the id.
         */
        function getById(tutorGroupId) {
            if (tutorGroupId) {
                return $http.get(url + tutorGroupId + '/remarkPermissions');
            } else {
                return null;
            }
        }
    }
})();
