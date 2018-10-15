/**
 * This is the AttendanceMonitorings Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('AttendanceMonitoringsEditorDirective')
        .controller('AttendanceMonitoringsEditorController', AttendanceMonitoringsEditorController);

    AttendanceMonitoringsEditorController.$inject = ['$log', '$uibModal', '$scope', 'AttendanceMonitoring'];

    function AttendanceMonitoringsEditorController($log, $uibModal, $scope, AttendanceMonitoring) {
        /* jshint validthis:true */
        var vm = this;
        vm.attendanceMonitorings = [];

        vm.loadAttendanceMonitorings = loadAttendanceMonitorings;
        vm.editAttendanceMonitorings = editAttendanceMonitorings;
        vm.addAttendanceMonitorings = addAttendanceMonitorings;

        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        vm.sortOrder = '+code';

        function changeSort(field) {
            if (vm.sortOrder == '+' + field) {
                vm.sortOrder = '-' + field;
            } else {
                vm.sortOrder = '+' + field;
            }
        }

        function loadAttendanceMonitorings() {
            AttendanceMonitoring.query().then(function(response) {
                vm.attendanceMonitorings = response.data;
                $log.info("Loading Faculty ");
            }, function(response) {
                $log.error("Failed to load Faculties");
            });
        }


        function editAttendanceMonitorings(attendanceMonitoringId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/attendance-monitorings-editor/views/attendance-monitorings-editorDialog.html',
                controller: 'AttendanceMonitoringsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    attendanceMonitoringsEntity: function(AttendanceMonitoring) {
                        return AttendanceMonitoring.get(attendanceMonitoringId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadAttendanceMonitorings();
            });

        }


        function addAttendanceMonitorings() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/attendance-monitorings-editor/views/attendance-monitorings-editor-addDialog.html',
                controller: 'AttendanceMonitoringsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    attendanceMonitoringsEntity: function() {
                        var attendanceMonitorings = {};
                        return attendanceMonitorings;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadAttendanceMonitorings();
            });

        }

        function isSortedAsc(fieldName) {
            if (vm.sortOrder == "+" + fieldName) {
                return true;
            }
            return false;
            // check if sortOrder is an array and if it contains fieldName
        }

        function isSortedDesc(fieldName) {
            if (vm.sortOrder == "-" + fieldName) {
                return true;
            }
            return false;
            // check if sortOrder is an array and if it contains fieldName
        }

    }

})();
