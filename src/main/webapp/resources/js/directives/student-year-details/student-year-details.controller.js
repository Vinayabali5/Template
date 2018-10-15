/**
 * This is the StudentYearDetailsDirectiveController, it is used to handle the student Year Details Directive Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */


(function() {
    'use strict';

    angular
        .module('StudentYearDetailsDirective')
        .controller('StudentYearDetailsDirectiveController', StudentYearDetailsDirectiveController);

    StudentYearDetailsDirectiveController.$inject = ['$log', '$scope', '$rootScope', 'Student'];

    function StudentYearDetailsDirectiveController($log, $scope, $rootScope, Student) {
        /* jshint validthis:true */
        var vm = this;
        vm.message = '';
        vm.studentYear = vm.studentYear ? vm.studentYear : {};
        vm.init = function() {};
        vm.hasLeft = hasLeft;
        vm.hasData = hasData;

        vm.init();

        function hasLeft() {
            if (vm.studentYear !== null && vm.studentYear !== undefined) {
                if (vm.studentYear.endDate === null) {
                    return false;
                }
            }
            return true;
        }

        function hasData() {
            if (vm.studentYear) {
                return true;
            } else {
                return false;
            }
        }
    }

})();
