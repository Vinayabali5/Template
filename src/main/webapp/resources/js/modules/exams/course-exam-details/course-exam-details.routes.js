(function() {
    angular
        .module('cid.exams.course-exam-details')
        .config(ExamsCourseDetailsRouteConfiguration);

    ExamsCourseDetailsRouteConfiguration.$inject = ["$stateProvider"];

    function ExamsCourseDetailsRouteConfiguration($stateProvider) {
        var courseDetailsState = {
            name: 'exams.course-details',
            url: '/courses',
            data: {
                roles: ['ROLE_ADMIN', 'ROLE_Exams Officer'],
            },
            views: {
                "content@": {
                    templateUrl: 'js/modules/exams/course-exam-details/views/course-list.html',
                    controller: 'CourseExamDetailsListController',
                    controllerAs: 'ctrl'
                },
            },
        };

        var courseDetailsEditState = {
            name: 'exams.course-details.edit',
            url: '/edit/{id}',
            data: {
                roles: ['ROLE_ADMIN', 'ROLE_Exams Officer'],
            },
            params: {
                uri: {
                    value: ''
                }
            },
            onEnter: function($rootScope, $stateParams, $state, $uibModal, Course) {
                $uibModal.open({
                    templateUrl: 'js/modules/exams/course-exam-details/views/course-exam-detail-edit.html',
                    controller: 'CourseExamDetailsEditorController',
                    controllerAs: 'ctrl',
                    size: 'lg',
                    resolve: {
                        entity: ['$stateParams', 'Course', function($stateParams, Course) {
                            return Course.get($stateParams.id);
                        }]
                    }
                }).result.then().finally(function() {
                    $rootScope.$emit('course-exam-tear-down');
                    $state.go('exams.course-details');
                });
            },
        };

        $stateProvider.state(courseDetailsState);
        $stateProvider.state(courseDetailsEditState);
    }

}());
