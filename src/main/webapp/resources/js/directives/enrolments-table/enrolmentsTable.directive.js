/**
 * This directive is used to display a table of Enrolments Table.
 *
 * Applied Styles:
 *
 * @type Directive
 */

(function() {
    'use strict';
    angular
        .module('EnrolmentsTableDirective', ['EntityServices'])
        .directive('enrolmentsTable', enrolmentsTableDirective);

    function enrolmentsTableDirective() {

        var directive = {
            restrict: 'E',
            scope: {
                showId: '=?',
                showStudent: '=?',
                showYear: '=?',
                showStatus: '=?',
                showMonitoring: '=?',
                showAll: '=?',
                enrolments: '=',
            },
            templateUrl: 'js/directives/enrolments-table/enrolmentsTable.html',
            controller: 'EnrolmentsTableController',
            controllerAs: 'ctrl'
        };

        return directive;

    }
})();
