angular.module('ComponentTableDirective', [
    'ngResource',
    'ui.bootstrap',
    'ComponentService',
]).directive('componentTable', function() {
    return {
        scope: {
            componentList: '=',
        },
        transclude: true,
        controller: 'ComponentTableDirectiveController',
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/exams/componentTable/componentTable.html'
    };
});
