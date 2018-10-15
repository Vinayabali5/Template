/**
 * This is the factory definition for the RoomType Data Service. This defines how to handle data about RoomType objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */

(function() {
    'use strict';

    angular
        .module('RoomTypeService', [])
        .factory('RoomType', roomTypeFactory);

    roomTypeFactory.$inject = ['$http', 'GLOBAL'];

    function roomTypeFactory($http, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/roomTypes/';

        var factory = {
            query: getAll,
            get: getById,
        };

        return factory;
        // Private Interface

        /**
         * This method is used to retrieve all the RoomType from the API collection.
         *
         * @return {RoomType} An array of RoomType objects.
         */
        function getAll() {
            return $http.get(url);
        }

        /**
         * This method is used to retrieve an instance of a RoomType from the API collection.
         * @param  {int} id of the RoomType object that is to be retrieved. 
         * @return {RoomType} An RoomType object as identified by the id.
         */
        function getById(id) {
            if (id) {
                return $http.get(url + id);
            } else {
                return null;
            }
        }

    }
})();
