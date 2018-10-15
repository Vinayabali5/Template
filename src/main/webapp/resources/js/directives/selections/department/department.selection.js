angular.module('SelectionBoxes').directive('departmentSelection', ['Department', function(Department) {
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
        controller: ['Department', function(Department) {
            var vm = this;
            vm.departments = [];

            Department.query().then(function(response) {
                vm.departments = response.data;
            }, function(response) {
                alert("Error Retrieving Departments");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/department/department.selection.html',

    };
}]);
