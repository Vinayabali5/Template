angular.module('SelectionBoxes').directive('applicationStatusSelection', ['ApplicationStatus', function(ApplicationStatus) {

    return {
        restrict: 'E',
        scope: {
            id: '@',
            class: '@',
            readonly: '=?',
            ngmodelvar: '=ngModel'

        },
        link: function(scope, element, attrs) {
            element[0].removeAttribute('id');
            element[0].removeAttribute('class');
            element[0].removeAttribute('readonly');
            element[0].disable = scope.readonly;
        },
        controller: ['ApplicationStatus', function(ApplicationStatus) {
            var vm = this;
            vm.applicationStatuses = [];

            ApplicationStatus.query().then(function(response) {
                vm.applicationStatuses = response.data;
            }, function(response) {
                alert("Error Retrieving ApplicationStatuses");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/applicationStatus/application-status.selection.html',
    };
}]);
