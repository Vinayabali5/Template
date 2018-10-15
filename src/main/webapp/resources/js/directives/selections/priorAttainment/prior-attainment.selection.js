angular.module('SelectionBoxes').directive('priorAttainmentSelection', ['PriorAttainment', function(PriorAttainment) {
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
        controller: ['PriorAttainment', function(PriorAttainment) {
            var vm = this;
            vm.priorAttainments = [];

            PriorAttainment.query().then(function(response) {
                vm.priorAttainments = response.data;
            }, function(response) {
                alert("Error Retrieving PriorAttainments");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/priorAttainment/prior-attainment.selection.html',

    };
}]);
