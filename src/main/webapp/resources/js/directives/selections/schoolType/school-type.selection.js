angular.module('SelectionBoxes').directive('schoolTypeSelection', function(SchoolType) {
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
        controller: ['SchoolType', function(SchoolType) {
            var vm = this;
            vm.schoolTypes = [];

            SchoolType.query().then(function(response) {
                vm.schoolTypes = response.data;
            }, function(err) {
                alert("Error Retrieving School Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/schoolType/school-type.selection.html',

    };
});
