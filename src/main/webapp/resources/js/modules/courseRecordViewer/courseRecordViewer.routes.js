(function() {
    'use strict';

    angular
        .module('cid.course-record-viewer')
        .config(courseViewerRouteConfiguration);

    courseViewerRouteConfiguration.$inject = ['$stateProvider'];

    function courseViewerRouteConfiguration($stateProvider) {

        $stateProvider
            .state('course-record', {
                parent: 'site',
                url: '/courses',
                data: {
                    roles: ['ROLE_Staff']
                },
                views: {
                    "side-bar@": {
                        templateUrl: 'js/modules/courseRecordViewer/views/side-bar.html'
                    },
                    "content@": {
                        templateUrl: 'js/modules/courseRecordViewer/views/layout.html',
                    },
                    "content.search@": {
                        templateUrl: 'js/modules/courseRecordViewer/views/search.html',
                        controller: 'CourseViewerSearchController',
                        controllerAs: 'ctrl'
                    },
                },
            })
            .state('course-record.course-list', {
                url: '/list',
                views: {
                    "viewer": {
                        templateUrl: 'js/modules/courseRecordViewer/views/course-list.html',
                        controller: 'CourseListController',
                        controllerAs: 'ctrl'
                    },
                },
                resolve: {
                    courseList: ['Course', function(Course) {
                        return Course.get();
                    }]
                }
            })
            .state('course-record.view', {
                url: '/{courseId}',
                data: {
                    roles: ['ROLE_Staff']
                },
                views: {
                    "viewer": {
                        templateUrl: 'js/modules/courseRecordViewer/views/course-viewer.html',
                        controller: 'CourseRecordViewerController',
                        controllerAs: 'ctrl'
                    },
                },
                resolve: {
                    courseEntity: ['$stateParams', 'Course', function($stateParams, Course) {
                        return Course.get($stateParams.courseId);
                    }],
                    enrolmentList: ['$stateParams', 'Course', function($stateParams, Course) {
                        return Course.enrolments($stateParams.courseId);
                    }],
                },
            })
            .state('course-record.course-group-list', {
                url: '/groups/list',
                views: {
                    "viewer": {
                        templateUrl: 'js/modules/courseRecordViewer/views/course-group-list.html',
                        controller: 'CourseGroupListController',
                        controllerAs: 'ctrl'
                    },
                },
            })
            .state('course-record.course-group-list.view', {
                url: '/groups/{groupId}',
                views: {
                    "viewer": {
                        template: '<h1>Test</h1>',
                        //				controller: 'CourseGroupListController',
                        //				controllerAs: 'ctrl'
                    },
                },
            })

        ;
    }

})();
