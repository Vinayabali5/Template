angular.module('SelectionBoxes').directive('studentRemarkPermissionSelection', ['StudentRemarkPermission', function(StudentRemarkPermission) {
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
        controller: ['StudentRemarkPermission', function(StudentRemarkPermission) {
            var vm = this;
            vm.studentRemarkPermissions = [];

            StudentRemarkPermission.query().then(function(response) {
                vm.studentRemarkPermissions = response.data;
            }, function(response) {
                alert("Error Retrieving StudentRemarkPermissions");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/studentRemarkPermission/student-remark-permission.selection.html',

    };
}]);
