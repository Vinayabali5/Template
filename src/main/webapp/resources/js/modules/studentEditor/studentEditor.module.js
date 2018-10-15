/**
 * This file defines the student records module for the CID system.
 */
(function() {
    'use strict';

    angular.module('cid.student-record', [
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.tabs',
        'ngResource',
        'StudentSearchDirective',
        'StudentDetailsDirective',
        'StudentYearDetailsDirective',
        'StudentOptionEditorTableDirective',
        'StudentAlternativeUciTableDirective',
        'StudentConcessionTypeTableDirective',

        'IdentificationViolationsEditorDirective'
    ]);

})();
