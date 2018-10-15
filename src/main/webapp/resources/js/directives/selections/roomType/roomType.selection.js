angular.module('SelectionBoxes').directive('roomTypeSelection', ['RoomType', function(RoomType) {
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
        controller: ['RoomType', function(RoomType) {
            var vm = this;
            vm.roomTypes = [];

            RoomType.query().then(function(response) {
                vm.roomTypes = response.data;
            }, function(response) {
                alert("Error Retrieving RoomTypes");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/roomType/roomType.selection.html',

    };
}]);
