angular.module('SelectionBoxes').directive('aimTypeSelection', ['AimType', function(AimType) {
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
        controller: ['AimType', function(AimType) {
            var vm = this;
            vm.aimTypes = [];

            AimType.query().then(function(response) {
                vm.aimTypes = response.data;
            }, function(err) {
                alert("Error Retrieving AimTypes");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/aimType/aim-type.selection.html',
    };
}]);
