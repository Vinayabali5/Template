/**
 * This is the Subjects Editor Directive definition.
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
        .module('SubjectsEditorDirective', ['EntityServices'])
        .directive('subjectsEditorDirective', subjectsEditorDirective);

    function subjectsEditorDirective() {

        var directive = {
            restrict: 'E',
            scope: {
                subjects: '=?',
            },
            controller: 'SubjectsEditorController',
            controllerAs: 'ctrl',
            templateUrl: 'js/directives/subjects-editor/views/subjects-editor.html',
        };

        return directive;

    }
})();
