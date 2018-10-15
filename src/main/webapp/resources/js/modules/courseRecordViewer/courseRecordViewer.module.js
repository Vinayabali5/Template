/**
 * This is the course-record viewer definition for the site.
 *
 *  Applied Styles: [Y001, Y002, Y010, Y021]
 *
 * @type Module
 */
(function() {
    'use strict';

    angular
        .module('cid.course-record-viewer', [
            'ui.router',
            'ui.bootstrap',
            'ui.bootstrap.tabs',
            'ngResource',

            'cid.app.constants',
            'CourseService',
        ]);
})();
