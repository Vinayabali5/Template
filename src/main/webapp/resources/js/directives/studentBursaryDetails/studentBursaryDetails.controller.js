/**
 * This is the Student Bursary Details Directive Controller, it is used to handle the student bursary details directive data and controls.
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */


(function() {
    'use strict';

    angular
        .module('StudentBursaryDetailsDirective')
        .controller('StudentBursaryDetailsDirectiveController', StudentBursaryDetailsDirectiveController);

    StudentBursaryDetailsDirectiveController.$inject = ['$scope', '$rootScope', 'Student', 'Logger', 'GLOBAL'];

    function StudentBursaryDetailsDirectiveController($scope, $rootScope, Student, Logger, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;
        var DEBUG = GLOBAL.DEBUG;

        vm.studentBursary = vm.studentBursary ? vm.studentBursary : {};
        vm.studentId = vm.studentBursary ? vm.studentBursary.studentId : null;

        //Operations
        vm.init = init;
        vm.loadStudentBursary = loadStudentBursary;
        vm.hasData = hasData;

        vm.init();

        // Event Listeners
        $rootScope.$on('student-bursary-saved', function() {
            vm.loadStudentBursary(vm.studentBursary.studentId);
        });

        function loadStudentBursary(id) {
            Logger.debug("II Reloading Student Bursary Information");
            if (id) {
                Student.bursary(id).then(function(response) {
                    Logger.debug('II Student Bursary Loaded');
                    vm.studentBursary = response.data;
                });
            }
        }

        function hasData() {
            if (vm.studentBursary) {
                return true;
            } else {
                return false;
            }
        }

        function init() {
            Logger.debug('StudentBursaryDetailsDirectiveController :: init called');
            Logger.debug(vm.studentBursary);
            vm.loadStudentBursary(vm.studentBursary.studentId);
        }
    }

})();
