angular.module('SelectionBoxes').directive('periodSelection', ['Period', function(Period) {
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
        controller: ['Period', function(Period) {
            var vm = this;
            vm.periods = [];

            Period.query().then(function(response) {
                vm.periods = response.data;
            }, function(response) {
                alert("Error Retrieving Periods");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/period/period.selection.html',

    };
}]);
