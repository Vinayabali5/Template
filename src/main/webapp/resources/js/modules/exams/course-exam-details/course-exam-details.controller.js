(function() {

    angular.module('cid.exams.course-exam-details').controller('CourseRecordViewerController', function($log, $scope, $rootScope, $state, Course, GLOBAL) {
        var vm = this;

        this.loaded = false;
        this.courses = [];
        this.course = {};

        this.searchText = '';

        this.init = function() {
            $log.debug('CourseRecordViewerController::init called');
            Course.query().then(function(data) {
                $log.info('II Successfully retrieve courses');
                vm.courses = response.data;
            }).error(function(data) {
                $log.error('EE Failed to retrieve courses from API');
            });
        };



        this.loadCourse = function(id) {
            $log.debug('CourseRecordViewerController::loadCourse called');
            Course.get(id).then(function(data) {
                $log.debug('II - Course with ID: ' + id + ' retireved.');
                vm.course = response.data;
                if (data) {
                    vm.loaded = true;
                }
                $rootScope.$emit('course.loaded');
            }).error(function(err) {
                $log.debug('EE - An error occurred trying to retireve the course with ID: ' + id);
                alert("Failed to retrieve course with ID: " + id);
            });
            //alert(id);
        };

        this.init();
    });

}());
