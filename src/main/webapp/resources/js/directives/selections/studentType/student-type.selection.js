angular.module('SelectionBoxes').directive('studentTypeSelection', ['StudentType', function(StudentType) {
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
        controller: ['StudentType', function(StudentType) {
            var vm = this;
            vm.studentTypes = [];

            StudentType.query().then(function(response) {
                vm.studentTypes = response.data;
            }, function(response) {
                alert("Error Retrieving Student Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/studentType/student-type.selection.html',

    };
}]);
