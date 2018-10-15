angular.module('SelectionBoxes').directive('roleSelection', ['Role', function(Role) {
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
        controller: ['Role', function(Role) {
            var vm = this;
            vm.roles = [];

            Role.query().then(function(response) {
                vm.roles = response.data;
            }, function(response) {
                alert("Error Retrieving Roles");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/role/role.selection.html',

    };
}]);
