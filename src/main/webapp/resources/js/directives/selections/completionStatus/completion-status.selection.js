angular.module('SelectionBoxes').directive('completionStatusSelection', ['CompletionStatus', function(CompletionStatus) {
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
        controller: ['CompletionStatus', function(CompletionStatus) {
            var vm = this;
            vm.completionStatuses = [];
            CompletionStatus.query().then(function(response) {
                vm.completionStatuses = response.data;
            }, function(response) {
                alert("Error Retrieving CompletionStatuses");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/completionStatus/completion-status.selection.html',
    };
}]);
