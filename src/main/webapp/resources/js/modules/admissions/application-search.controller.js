/**
 * The Search Module for finding applicants
 */
angular
    .module('cid.admissions')
    .controller('ApplicationSearchController', ApplicationSearchController);

ApplicationSearchController.$inject = ['$log', '$scope', '$http', 'ApplicationForm'];

function ApplicationSearchController($log, $scope, $http, ApplicationForm) {
    /* jshint validthis:true */
    var vm = this;

    // Public Interface

    vm.searchTerm = '';
    vm.noResults = true;

    vm.loading = false;
    vm.message = "";

    vm.search = search;

    // Private Interface

    /* Event to Search */
    function search(search) {
        $log.debug('II StudentSearchController :: search called');
        vm.loading = true;
        displayMessage("Loading please wait!");
        var url = "http://localhost:9001/api/applications/search/" + search;
        //$http.get(url)
        ApplicationForm.search(search).then(function(response) {
            if (response.data.length !== 0) {
                vm.applicationList = response.data;
                vm.noResults = false;
                displayMessage("");
            } else {
                vm.applicationList = [];
                vm.noResults = true;
                displayMessage(response.message);
            }
        });

    }

    function displayMessage(message) {
        $log.debug('II SearchController :: displayMessage called');
        vm.message = message;
    }

}
