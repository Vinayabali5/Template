(function() {
    angular.module('cid.exams', [
        'cid.exams.import-base-data',
        'cid.exams.base-data-viewer',
        'cid.exams.course-exam-details',
        'cid.exams.generate-entries',
        'cid.exams.generate-edi',
        'cid.exams.seating-plan',
        'cid.exams.exam-series',
        'cid.exams.exam-board-editor'
    ]);
}());
