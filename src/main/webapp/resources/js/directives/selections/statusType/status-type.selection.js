angular.module('SelectionBoxes').directive('statusTypeSelection', ['StatusType', function(StatusType) {
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
        controller: ['StatusType', function(StatusType) {
            var vm = this;
            vm.statusTypes = [];

            StatusType.query().then(function(response) {
                vm.statusTypes = response.data;
            }, function(err) {
                alert("Error Retrieving StatusTypes");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/statusType/status-type.selection.html',
    };
}]);
