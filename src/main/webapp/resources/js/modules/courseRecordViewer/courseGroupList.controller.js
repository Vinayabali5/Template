(function() {
    'use strict';

    angular
        .module('cid.course-record-viewer')
        .controller('CourseGroupListController', courseGroupListController);

    courseGroupListController.$inject = ['$log', '$scope', '$rootScope', '$state', 'CourseGroup', 'GLOBAL', 'APP'];

    function courseGroupListController($log, $scope, $rootScope, $state, CourseGroup, GLOBAL, APP) {
        /* jshint validthis:true */
        var vm = this;

        vm.loaded = false;
        vm.courseGroups = [];
        vm.courseGroup = {};
        vm.searchText = '';

        vm.init = init;
        vm.loadCourse = loadCourseGroup;
        vm.loadCourseGroupByYear = loadCourseGroupByYear;
        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.visible = false;
        vm.resetFilters = resetFilters;

        // loads course lists based on year change
        $scope.$on('$destroy', $rootScope.$on("current-year-changed", function(data) {
            vm.loadCourseGroupByYear(APP.getYear());
        }));

        // Apply filters
        $scope.filter = {
            spec: '',
            _yearGroupDescription: '',
            _departmentDescription: ''

        };

        function applyFilter() {
            vm.filterParams = {
                spec: $scope.filter.spec,
                _yearGroupDescription: $scope.filter._yearGroupDescription,
                _departmentDescription: $scope.filter._departmentDescription
            };
        }

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }


        function init() {
            $log.log('CourseGroupListController::init called');
            CourseGroup.getByYear(APP.getYear()).then(function(response) {
                $log.info('II Successfully retrieved CourseGroups');
                vm.courseGroups = response.data;
            }, function(response) {
                $log.error('EE Error retrieving CourseGroups');
            });
        }

        function loadCourseGroup(id) {
            $log.log('CourseGroupListController::loadCourseGroup called');
            CourseGroup.get(id).then(function(response) {
                $log.log('II - Course with ID: ' + id + ' retireved.');
                vm.course = response.data;
                if (response.data) {
                    vm.loaded = true;
                }
                $rootScope.$emit('course.loaded');
            }, function(response) {
                $log.log('EE - An error occurred trying to retireve the course with ID: ' + id);
                alert("Failed to retrieve course with ID: " + id);
            });
        }

        function loadCourseGroupByYear(year) {
            $log.log('CourseGroupListController::loadCourseGroupByYear called');
            CourseGroup.getByYear(year).then(function(response) {
                $log.info('II Successfully retrieved CourseGroupsByYear');
                vm.courseGroups = response.data;
            }, function(response) {
                $log.error('EE Error retrieving CourseGroups');
            });
        }


        // Resets the filter
        function resetFilters() {

            vm.filterParams = {
                spec: '',
                _yearGroupDescription: '',
                _departmentDescription: ''
            };

            $scope.filter = {
                spec: '',
                _yearGroupDescription: '',
                _departmentDescription: ''
            };
        }

        vm.init();
    }

})();
