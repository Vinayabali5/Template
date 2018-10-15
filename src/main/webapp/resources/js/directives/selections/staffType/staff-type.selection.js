angular.module('SelectionBoxes').directive('staffTypeSelection', ['StaffType', function(StaffType) {
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
        controller: ['StaffType', function(StaffType) {
            var vm = this;
            vm.staffTypes = [];

            StaffType.query().then(function(response) {
                vm.staffTypes = response.data;
            }, function(response) {
                alert("Error Retrieving Staff Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/staffType/staff-type.selection.html',

    };
}]);
