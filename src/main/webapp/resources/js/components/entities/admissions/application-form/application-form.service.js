//

(function() {

    angular
        .module('cid.service.data.admission.application-form', [])
        .factory('ApplicationForm', ApplicationForm);

    ApplicationForm.$inject = ['$http', 'GLOBAL'];

    function ApplicationForm($http, GLOBAL) {
        var url = GLOBAL.API + '/applications/';

        var service = {};
        service.get = getById;
        service.search = search;
        return service;

        // Private Interface

        function getById(id) {
            return $http.get(url + id);
        }

        function search(search) {
            return $http.get(url + '/search/' + search);
        }

    }

})();
