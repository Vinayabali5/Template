angular.module('SelectionBoxes').directive('attendanceMonitoringSelection', ['AttendanceMonitoring', function(AttendanceMonitoring) {
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
        controller: ['AttendanceMonitoring', function(AttendanceMonitoring) {
            var vm = this;
            vm.attendanceMonitorings = [];
            AttendanceMonitoring.query().then(function(response) {
                vm.attendanceMonitorings = response.data;
            }, function(response) {
                alert("Error Retrieving AttendanceMonitorings");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/attendanceMonitoring/attendance-monitoring.selection.html',
    };
}]);
