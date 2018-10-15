angular.module('SelectionBoxes').directive('roomSelection', ['Room', function(Room) {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            id: '@',
            class: '@',
            readonly: '=?',
            ngmodelvar: '=ngModel'

        },
        link: function(scope, element, attrs, ctrl) {
            element[0].removeAttribute('id');
            element[0].removeAttribute('class');
            element[0].removeAttribute('readonly');
            element[0].disable = scope.readonly;
            scope.updateModel = function(item) {
                ctrl.$setViewValue(item);
            };
        },
        controller: ['Room', function(Room) {
            var vm = this;
            vm.rooms = [];

            Room.query().then(function(response) {
                vm.rooms = response.data;
            }, function(response) {
                alert("Error Retrieving Rooms");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/room/room.selection.html',

    };
}]);
