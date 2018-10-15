(function() {
    'use strict';

    angular
        .module('cid.exams.exam-board-editor')
        .config(examBoardEditor);

    examBoardEditor.$inject = ['$stateProvider', '$urlRouterProvider'];

    function examBoardEditor($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('data.exam-boards', {
                url: '/exam-boards',
                data: {
                    roles: ['ROLE_Exams Officer', 'ROLE_System Admin']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/exams/exam-board/views/exam-board-list.html',
                        controller: 'ExamBoardController',
                        controllerAs: 'ctrl'
                    },
                },
            })

            .state('new', {
                url: '/new',
                data: {
                    roles: ['ROLE_Exams Officer', 'ROLE_System Admin']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'js/modules/exams/exam-board/views/exam-board-form.html',
                        controller: 'ExamBoardDialogController',
                        controllerAs: 'ctrl',
                        size: 'lg',
                        resolve: {
                            entity: [function() {
                                return {
                                    code: null,
                                    description: null
                                };
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('exams.exam-board', null, {
                            reload: true
                        });
                    }, function() {
                        $state.go('exams.exam-board');
                    });
                }]
            })

            .state('edit', {
                url: '/edit/{id}',
                data: {
                    roles: ['ROLE_Exams Officer', 'ROLE_System Admin']
                },
                params: {
                    uri: {
                        value: ''
                    }
                },
                onEnter: function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'js/modules/exams/exam-board/views/exam-board-edit-form.html',
                        controller: 'ExamBoardDialogController',
                        controllerAs: 'ctrl',
                        size: 'lg',
                        resolve: {
                            entity: ['ExamBoard', function(ExamBoard) {
                                return ExamBoard.get($stateParams.id); // Is $stateParams.id right?
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('exams.exam-board', null, {
                            reload: true
                        });
                    }, function() {
                        $state.go('^');
                    });
                }
            });

        //		.state('examBoards.examBaseData', {
        //			parent: 'site',
        //			url: '/basedata/{id}',
        //			views: {
        //				"@examBaseDataViewer": {
        //					templateUrl: 'js/modules/examBaseDataViewer/views/examBasedataViewer-form2.html',
        //					controller: 'ExamSyllabusViewer',
        //					controllerAs: 'ctrl',
        //				}
        //			}
        //		});
    }
})();
