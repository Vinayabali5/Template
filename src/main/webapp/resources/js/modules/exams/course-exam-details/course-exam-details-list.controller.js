(function() {

    angular.module('cid.exams.course-exam-details').controller('CourseExamDetailsListController', function($log, $scope, $rootScope, $state, Course, GLOBAL) {
        var vm = this;

        // Private Properties and Methods
        this.loaded = false;
        this.courses = [];
        this.course = {};

        $scope.filter = {
            courseSpec: '',
            level: '',
            subject: '',
            examBoard: '',
            exclude: {
                syllabusCode: 'NA',
                learningAimReference: 'CMISC001'
            }
        };

        $rootScope.$on("current-year-changed", function(data) {
            init();
        });

        function init() {
            $log.debug('CourseRecordViewerController::init called');
            Course.query().then(function(response) {
                $log.info('II Successfully retrieved courses');
                vm.courses = response.data;
                applyFilter();
            }, function(response) {
                $log.error('EE Failed to retrieve courses from API');
            });
        }

        function applyFilter() {
            $scope.filterParams = {
                spec: $scope.filter.courseSpec,
                _levelDescription: $scope.filter.level,
                _subjectDescription: $scope.filter.subject,
                _examBoardDescription: $scope.filter.examBoard,
                syllabusCode: '!' + $scope.filter.exclude.syllabusCode,
                learningAimReference: '!' + $scope.filter.exclude.learningAimReference
            };
        }

        function loadCourse(id) {
            $log.debug('CourseRecordViewerController::loadCourse called');
            Course.get(id).then(function(response) {
                $log.debug('II - Course with ID: ' + id + ' retireved.');
                vm.course = response.data;
                if (response) {
                    vm.loaded = true;
                }
                $rootScope.$emit('course.loaded');
            }, function(err) {
                $log.debug('EE - An error occurred trying to retireve the course with ID: ' + id);
                alert("Failed to retrieve course with ID: " + id);
            });
        }

        var courseListStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'course-record.course-list') {
                init();
            }
        });

        //    $scope.on('$destroy', function() {
        //    	courseListStateChangeSuccess();
        //    });

        // Public Properties and Methods
        vm.loadCourse = loadCourse;
        vm.applyFilter = applyFilter;

        vm.editExamDetails = function(courseId) {
            $state.go('exams.course-details.edit', {
                id: courseId
            });
        };

        // Initialisation
        init();
    });
}());
