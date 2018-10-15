/**
 * This is the main module definition for the site.
 *
 *  Applied Styles: [Y001, Y002, Y010, Y021]
 *
 * @type Module
 */
(function() {
    angular
        .module('cid.exams.exam-series', ['ui.router', 'ui.bootstrap', 'ngResource', 'ExamSeriesService']);
})();
