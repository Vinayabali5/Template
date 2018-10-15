/**
 * This is the CorrespondencesTableDirective definition.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y023, Y024, Y070, Y072, Y074]*
 * 
 */

(function() {
    'use strict';

    angular
        .module('CorrespondencesTableDirective', ['EntityServices'])
        .directive('correspondencesTable', correspondencesTable);

    function correspondencesTable() {

        var directive = {
            restrict: 'E',
            scope: {
                showId: '=?',
                showCorrespondence: '=?',
                showAll: '=?',
                correspondences: '=',
            },
            //		controller: 'CorrespondencesTableDirectiveController',
            //     	controllerAs: 'ctrl',
            templateUrl: 'js/directives/correspondencesTable/correspondencesTable.html',
        };
        return directive;
    }

})();
