/**
 * This is the StudentSummary Directive definition.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y023, Y024, Y070, Y072, Y074]*
 *
 *  @type Directive
 *
 *
 *   */
(function() {
    'use strict';
    angular
        .module('StudentSummaryDirective', [])
        .directive('studentSummary', studentSummary);

    function studentSummary() {
        return {
            restrict: 'E',
            scope: {
                showAll: '=?',
                showDob: '=?',
                showGender: '=?',
                student: '=',
            },
            templateUrl: 'js/directives/student-summary/student-summary.html',
        };
    }
})();
