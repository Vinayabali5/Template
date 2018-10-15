(function() {
    angular
        .module('cid.exams.course-exam-details', ['ui.router',
            'ui.bootstrap',
            'ui.bootstrap.tabs',
            'ngResource',
            'CourseExamDirective',
            'SyllabusTableDirective',
            'OptionTableDirective'
        ]);
})();
