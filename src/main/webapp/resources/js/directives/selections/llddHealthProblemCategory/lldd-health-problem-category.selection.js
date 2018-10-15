angular.module('SelectionBoxes').directive('llddHealthProblemCategorySelection', ['LLDDHealthProblemCategory', function(LLDDHealthProblemCategory) {
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
        controller: ['LLDDHealthProblemCategory', function(LLDDHealthProblemCategory) {
            var vm = this;
            vm.lLDDHealthProblemCategories = [];

            LLDDHealthProblemCategory.query().then(function(response) {
                vm.lLDDHealthProblemCategories = response.data;
            }, function(response) {
                alert("Error Retrieving LLDDHealthProblemCategories");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/llddHealthProblemCategory/lldd-health-problem-category.selection.html',

    };
}]);
