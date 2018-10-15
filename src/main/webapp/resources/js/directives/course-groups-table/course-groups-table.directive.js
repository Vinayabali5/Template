/**
 * This is the ContactsEditorDirective definition.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y023, Y024, Y070, Y072, Y074]
 *
 * @example <contacts-editor person-id="{ctrl.personId}" contacts="{ctrl.contacts}"></contacts-editor>
 */

(function() {
    'use strict';

    angular
        .module('CourseGroupsTableDirective', ['EntityServices'])
        .directive('courseGroupsTable', courseGroupsTable);

    function courseGroupsTable() {
        var directive = {
            restrict: 'E',
            scope: {
                showId: '@?',
                showYearGroup: '@?',
                showYear: '@?',
                showAll: '@?',
                includeReports: '@?',
                courseGroups: '=',
                filterParams: '=?'

            },
            bindToController: true,
            templateUrl: 'js/directives/course-groups-table/course-groups-table.html',
            controller: 'CourseGroupsTableDirectiveController',
            controllerAs: 'ctrl'
        };
        return directive;
    }
})();
