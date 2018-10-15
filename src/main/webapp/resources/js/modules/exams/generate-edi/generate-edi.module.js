(function() {
    angular
        .module('cid.exams.generate-edi', ['ui.router',
            'ui.bootstrap',
            'ngResource',
            'ExamSeriesTableDirective',
            'ExamSeriesService',
            'ExamSeriesCheckBoxDirective'
        ]);
})();
