angular.module('SelectionBoxes').directive('yearGroupSelection', ['YearGroup', function(YearGroup) {
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
        controller: ['YearGroup', function(YearGroup) {
            var vm = this;
            vm.yearGroups = [];

            YearGroup.query().then(function(response) {
                vm.yearGroups = response.data;
            }, function(response) {
                alert("Error Retrieving YearGroups");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/yearGroup/year-group.selection.html',

    };
}]);
