angular.module('SelectionBoxes').directive('llddHealthProblemSelection', ['LLDDHealthProblem', function(LLDDHealthProblem) {
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
        controller: ['LLDDHealthProblem', function(LLDDHealthProblem) {
            var vm = this;
            vm.lLDDHealthProblems = [];

            LLDDHealthProblem.query().then(function(response) {
                vm.lLDDHealthProblems = response.data;
            }, function(response) {
                alert("Error Retrieving LLDDHealthProblems");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/llddHealthProblem/lldd-health-problem.selection.html',

    };
}]);
