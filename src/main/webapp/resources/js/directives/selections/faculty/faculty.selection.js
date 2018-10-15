angular.module('SelectionBoxes').directive('facultySelection', ['Faculty', function(Faculty) {
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
        controller: ['Faculty', function(Faculty) {
            var vm = this;
            vm.faculties = [];

            Faculty.query().then(function(response) {
                vm.faculties = response.data;
            }, function(response) {
                alert("Error Retrieving Faculties");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/faculty/faculty.selection.html',

    };
}]);
