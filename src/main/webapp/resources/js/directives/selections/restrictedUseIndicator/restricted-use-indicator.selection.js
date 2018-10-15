angular.module('SelectionBoxes').directive('restrictedUseIndicatorSelection', ['RestrictedUseIndicator', function(RestrictedUseIndicator) {
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
        controller: ['RestrictedUseIndicator', function(RestrictedUseIndicator) {
            var vm = this;
            vm.restrictedUseIndicators = [];

            RestrictedUseIndicator.query().then(function(response) {
                vm.restrictedUseIndicators = response.data;
            }, function(response) {
                alert("Error Retrieving RestrictedUseIndicators");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/restrictedUseIndicator/restricted-use-indicator.selection.html',

    };
}]);
