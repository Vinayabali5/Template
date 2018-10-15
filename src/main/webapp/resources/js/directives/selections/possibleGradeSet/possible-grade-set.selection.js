angular.module('SelectionBoxes').directive('possibleGradeSetSelection', ['PossibleGradeSet', function(PossibleGradeSet) {
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
        controller: ['PossibleGradeSet', function(PossibleGradeSet) {
            var vm = this;
            vm.possibleGradeSets = [];

            PossibleGradeSet.query().then(function(response) {
                vm.possibleGradeSets = response.data;
            }, function(response) {
                alert("Error Retrieving PossibleGradeSets");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/possibleGradeSet/possible-grade-set.selection.html',

    };
}]);
