angular.module('CourseExamDirective', ['ngResource', 'ui.bootstrap', 'EntityServices', ]).directive('courseExam', function() {
    return {
        scope: {},
        replace: true,
        controller: 'CourseExamDirectiveController',
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/exams/courseExam/courseExam.html',
    };
});
