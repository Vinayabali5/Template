angular.module('SelectionBoxes').directive('possibleGradeSelection', ['PossibleGrade', function(PossibleGrade) {
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
        controller: ['PossibleGrade', function(PossibleGrade) {
            var vm = this;
            vm.possibleGrades = [];

            PossibleGrade.query().then(function(response) {
                vm.possibleGrades = response.data;
            }, function(response) {
                alert("Error Retrieving PossibleGrades");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/possibleGrade/possible-grade.selection.html',

    };
}]);
