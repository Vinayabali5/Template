(function() {
    'use strict';

    angular.module('cid.course-record-viewer').controller(
        'CourseListController', CourseListController);

    CourseListController.$inject = ['$log', '$scope', '$rootScope', '$state', 'courseList', 'Course', 'GLOBAL', 'APP'];

    function CourseListController($log, $scope, $rootScope, $state, courseList, Course, GLOBAL, APP) {
        /* jshint validthis:true */
        var vm = this;
        vm.loaded = false;
        vm.courses = courseList ? courseList.data : [];
        vm.course = {};
        vm.searchText = '';
        vm.visible = false;
        // Public Interface
        vm.init = init;
        vm.loadCourse = loadCourse;
        vm.loadCourseListByYear = loadCourseListByYear;
        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;


        //vm.init();

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            spec: '',
            _levelDescription: '',
            _subjectDescription: '',
            _examBoardDescription: '',
            learningAimReference: ''
        };

        function applyFilter() {
            vm.filterParams = {
                spec: $scope.filter.spec,
                _levelDescription: $scope.filter._levelDescription,
                _subjectDescription: $scope.filter._subjectDescription,
                _examBoardDescription: $scope.filter._examBoardDescription,
                learningAimReference: $scope.filter.learningAimReference
            };
        }

        function getCurrentYear() {
            return APP.getYear();
        }

        // loads course lists based on year change
        $scope.$on('$destroy', $rootScope.$on("current-year-changed", function(data) {
            vm.loadCourseListByYear(APP.getYear());
        }));

        function init() {
            $log.log('CourseRecordViewerController::init called');
            vm.loadCourseListByYear(APP.getYear());
        }

        function loadCourse(id) {
            $log.log('CourseRecordViewerController::loadCourse called');
            Course.get(id).then(function(response) {
                    $log.log('II - Course with ID: ' + id + ' retireved.');
                    vm.course = response.data;
                    if (response.data) {
                        vm.loaded = true;
                    }
                    $rootScope.$emit('course.loaded');
                },
                function(response) {
                    $log.log('EE - An error occurred trying to retireve the course with ID: ' + id);
                    alert("Failed to retrieve course with ID: " + id);
                });
        }

        function loadCourseListByYear(year) {
            Course.getByYear(year).then(function(response) {
                $log.info('II Successfully retrieve courses');
                vm.courses = response.data;
            }, function(response) {
                $log.error('EE Failed to retrieve courses from API');
            });
        }

        // Resets the filter
        function resetFilters() {

            vm.filterParams = {
                spec: '',
                _levelDescription: '',
                _subjectDescription: '',
                _examBoardDescription: '',
                learningAimReference: ''
            };

            $scope.filter = {
                spec: '',
                _levelDescription: '',
                _subjectDescription: '',
                _examBoardDescription: '',
                learningAimReference: ''
            };
        }

    }

})();
