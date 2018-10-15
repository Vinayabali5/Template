angular.module('SelectionBoxes').directive('destinationSelection', ['Destination', function(AimType) {
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
        controller: ['Destination', function(Destination) {
            var vm = this;
            vm.destinations = [];

            Destination.query().then(function(response) {
                vm.destinations = response.data;
            }, function(response) {
                alert("Error Retrieving Destination");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/destination/destination.selection.html',
    };
}]);
