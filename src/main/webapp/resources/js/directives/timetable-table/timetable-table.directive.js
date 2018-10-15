/**
 * This directive, is used to display Timetable Table
 *
 * Applied Styles: [Y001, Y002, Y010, Y020, Y021, Y022, Y023, Y024, Y070, Y074, Y075, ]
 * 
 */


(function() {
    'use strict';
    angular
        .module('TimetableTableDirective', [])
        .directive('timetableTable', timetableTable);

    function timetableTable() {

        var directive = {
            restrict: 'E',
            scope: {
                showAll: '=?',
                showStaffId: '=?',
                timetable: '=',
            },
            controller: 'TimetableTableController',
            controllerAs: 'ctrl',
            templateUrl: 'js/directives/timetable-table/timetable-table.html'
        };
        return directive;
    }

})();
