/**
 * This is the Course Record Viewer Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */


(function() {

    'use strict';

    angular
        .module('cid.course-record-viewer')
        .controller('CourseViewerSearchController', courseViewerSearchController)
        .controller('CourseRecordViewerController', courseRecordViewerController);


    courseViewerSearchController.$inject = ['$state'];

    courseRecordViewerController.$inject = ['$log', '$scope', '$rootScope', '$state', '$stateParams', 'courseEntity', 'enrolmentList', 'Course', 'GLOBAL'];


    function courseViewerSearchController($state) {
        /* jshint validthis:true */
        var vm = this;
        vm.loadCourse = loadCourse;

        function loadCourse(id) {
            $state.go('course-record.view', {
                courseId: id
            });
        }

    }

    function courseRecordViewerController($log, $scope, $rootScope, $state, $stateParams, courseEntity, enrolmentList, Course, GLOBAL) {
        /* jshint validthis:true */
        var vm = this;

        // Public Interface

        vm.course = courseEntity ? courseEntity.data : undefined;
        vm.enrolments = enrolmentList ? enrolmentList.data : [];

        // Event Handlers

        $scope.$on('$destroy', $rootScope.$on("current-year-changed", function(data) {
            loadCourseGroups(vm.course.id);
            loadEnrolments(vm.course.id);
        }));

        // Private Interface

        function loadCourse(id) {
            $log.log('CourseRecordViewerController :: loadCourse called');
            Course.get(id).then(function(response) {
                $log.log('II - Course with ID: ' + id + ' retireved.');
                vm.course = response.data;
                loadCourseGroups(id);
                loadEnrolments(id);
            }, function(response) {
                $log.log('EE - An error occurred trying to retireve the course with ID: ' + id);
                alert("Failed to retrieve course with ID: " + id);
            });

        }

        function loadCourseGroups(id) {
            $log.log('II CourseRecordViewerController :: loadCourseGroups called');
            Course.courseGroups(id).then(function(response) {
                $log.log('II - Course Groups for Course with ID: ' + id + ' retrieved.');
                vm.courseGroups = response.data;
                $rootScope.$emit('course.course-groups.loaded');
            });
        }

        function loadEnrolments(id) {
            Course.enrolments(id).then(function(response) {
                vm.enrolments = response.data;
            });
        }

    }

})();
