/**
 * This is the Course Groups Table Directive Controller ,used by ContactsTableDirective
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('CourseGroupsTableDirective')
        .controller('CourseGroupsTableDirectiveController', CourseGroupsTableDirectiveController);

    CourseGroupsTableDirectiveController.$inject = ['$log', '$scope', '$rootScope', 'GLOBAL'];

    function CourseGroupsTableDirectiveController($log, $scope, $rootScope, GLOBAL) {
        var vm = this;
        var url = GLOBAL.REPORT_URL;

        vm.sortOrder = "+spec";
        // Down arrow: &#x25BC;
        // Up Arrow: &#x25B2;

        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        function changeSort(field) {
            if (vm.sortOrder == '+' + field) {
                vm.sortOrder = '-' + field;
            } else {
                vm.sortOrder = '+' + field;
            }
        }

        function isSortedAsc(fieldName) {
            if (vm.sortOrder == "+" + fieldName) {
                return true;
            }
            return false;
            // TODO: check if sortOrder is an array and if it contains fieldName
        }

        function isSortedDesc(fieldName) {
            if (vm.sortOrder == "-" + fieldName) {
                return true;
            }
            return false;
            // TODO: check if sortOrder is an array and if it contains fieldName
        }
    }
})();
