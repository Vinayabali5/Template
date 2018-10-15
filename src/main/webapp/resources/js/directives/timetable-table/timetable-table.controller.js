/**
 * This directive, is used to display Timetable table
 *
 * Applied Styles: [Y001, Y002, Y010, Y020, Y021, Y022, Y023, Y024, Y070, Y074, Y075, ]
 * 
 */


(function() {
    'use strict';

    angular
        .module('TimetableTableDirective')
        .controller('TimetableTableController', TimetableTableController);

    TimetableTableController.$inject = ['$log', '$uibModal', '$scope', 'Staff'];

    function TimetableTableController($log, $uibModal, $scope, Staff) {
        /* jshint validthis:true */
        var vm = this;
        vm.staffId = vm.staffId ? vm.staffId : undefined;
        vm.timetable = [];

        vm.loadTimetable = loadTimetable;

        function loadTimetable() {
            Staff.getTimetable(vm.staffId).then(function(response) {
                vm.timetable = response.data;
                $log.info("Loading timetable");
            }, function(response) {
                $log.error("Failed to load timetable");
            });
        }
    }
})();
