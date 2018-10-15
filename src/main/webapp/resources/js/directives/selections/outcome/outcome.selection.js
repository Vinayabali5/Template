angular.module('SelectionBoxes').directive('outcomeSelection', ['Outcome', function(Outcome) {
    return {
        restrict: 'E',
        scope: {
            id: '@',
            class: '@',
            readonly: '=?',
            ngmodelvar: '=ngModel',
        },
        link: function(scope, element, attrs) {
            element[0].removeAttribute('id');
            element[0].removeAttribute('class');
            element[0].removeAttribute('readonly');
            element[0].disable = scope.readonly;
        },
        controller: ['Outcome', function(Outcome) {
            var vm = this;
            vm.outcomes = [];

            Outcome.query().then(function(response) {
                vm.outcomes = response.data;
            }, function(response) {
                alert("Error Retrieving Outcomes");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/outcome/outcome.selection.html',

    };
}]);
