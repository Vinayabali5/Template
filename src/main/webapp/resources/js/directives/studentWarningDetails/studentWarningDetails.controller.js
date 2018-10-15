/**
 * This is the StudentWarningDetails Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('StudentWarningDetailsDirective')
        .controller('StudentWarningDetailsDirectiveController', StudentWarningDetailsDirectiveController);

    StudentWarningDetailsDirectiveController.$inject = ['$log', '$scope', '$state', '$rootScope'];

    function StudentWarningDetailsDirectiveController($log, $scope, $state, $rootScope) {
        var vm = this;

        // Controller Methods
        this.init = function() {
            $log.log('StudentWarningDetailsDirectiveController :: init called');
            // this.updateStudentWarnings();
        };

        $scope.hasData = function() {
            if ($scope.studentWarning) {
                return true;
            } else {
                return false;
            }
        };

        this.init();
    }
})();
