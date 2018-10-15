angular.module('SelectionBoxes').directive('schoolSelection', ['School', function(School) {
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
        controller: ['School', function(School) {
            var vm = this;
            vm.schools = [];

            School.query().then(function(response) {
                vm.schools = response.data;
            }, function(response) {
                alert("Error Retrieving School Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/school/school.selection.html',

    };
}]);
