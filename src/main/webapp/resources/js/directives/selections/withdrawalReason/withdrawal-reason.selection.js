angular.module('SelectionBoxes').directive('withdrawalReasonSelection', ['WithdrawalReason', function(WithdrawalReason) {
    return {
        restrict: 'E',
        scope: {
            id: '@',
            class: '@',
            readonly: '=?',
            ngmodelvar: '=ngModel',
            includeBlank: '=?'

        },
        link: function(scope, element, attrs) {
            element[0].removeAttribute('id');
            element[0].removeAttribute('class');
            element[0].removeAttribute('readonly');
            element[0].disable = scope.readonly;
        },
        controller: ['WithdrawalReason', function(WithdrawalReason) {
            var vm = this;
            vm.withdrawalReasons = [];

            WithdrawalReason.query().then(function(response) {
                vm.withdrawalReasons = response.data;
            }, function(response) {
                alert("Error Retrieving WithdrawalReasons");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/withdrawalReason/withdrawal-reason.selection.html',

    };
}]);
