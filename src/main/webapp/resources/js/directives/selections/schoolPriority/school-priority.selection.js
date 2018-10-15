angular.module('SelectionBoxes').directive('schoolPrioritySelection', ['SchoolPriority', function(SchoolPriority) {
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
        controller: ['SchoolPriority', function(SchoolPriority) {
            var vm = this;
            vm.schoolPriorities = [];

            SchoolPriority.query().then(function(response) {
                vm.schoolPriorities = response.data;
            }, function(response) {
                alert("Error Retrieving School Priority");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/schoolPriority/school-priority.selection.html',

    };
}]);
