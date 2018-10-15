/**
 * The ExamBoardEditor module for displaying and editing the list of ExamBoards
 */
(function() {
    'use strict';

    angular
        .module('cid.exams.exam-board-editor')
        .controller('ExamBoardController', examBoardController);

    examBoardController.$inject = ['$log', '$scope', '$state', '$uibModal', 'ExamBoard'];

    function examBoardController($log, $scope, $state, $uibModal, ExamBoard) {
        /*jshint validthis: true */
        var vm = this;
        vm.addExamBoard = addExamBoard;
        vm.editExamBoard = editExamBoard;
        vm.examBoardList = [];
        vm.getPage = getPage;
        vm.loadExamBoards = loadExamBoards;
        vm.pageChanged = pageChanged;
        vm.paginationInfo = {
            pageNumber: 1,
            pageSize: 10,
            sort: 'name',
            order: 'ASC'
        };
        vm.search = search;
        vm.searchTerm = '';
        vm.viewBaseData = viewBaseData;

        vm.loadExamBoards();

        /////////////////////////////////////////////////////

        function addExamBoard() {
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
        }

        /**
         *
         */
        function editExamBoard(url) {
            $uibModal.open({
                templateUrl: 'js/modules/exams/exam-board/views/exam-board-edit-form.html',
                controller: 'ExamBoardDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    entity: function(ExamBoard) {
                        return ExamBoard.get(url);
                    }
                }
            }).result.then(function(result) {
                $state.go('exams.exam-board', null, {
                    reload: true
                });
            }, function() {
                $state.go('^');
            });
        }

        /**
         *
         */
        function getPage() {
            $log.debug('Loading page: ' + this.paginationInfo.pageNumber);
            ExamBoard.query({
                page: this.paginationInfo.pageNumber - 1,
                size: this.paginationInfo.pageSize,
                sort: this.paginationInfo.sort + ',' + this.paginationInfo.order
            }, function(data, header) {
                vm.paginationInfo.pageNumber = data.page.number + 1;
                vm.paginationInfo.pageSize = data.page.size;
                vm.paginationInfo.totalItems = data.page.totalElements;
                vm.paginationInfo.totalPages = data.page.totalPages;
                vm.examBoardList = data.examBoardDtos;
            });
        }

        /**
         *
         */
        function loadExamBoards() {
            $log.debug('$scope.loadExamBoards');
            ExamBoard.query().then(function(response) {
                vm.examBoardList = response.data;
            });
        }

        /**
         *
         */
        function pageChanged() {
            $log.debug('Page changed to: ' + this.paginationInfo.pageNumber);
            vm.getPage();
        }

        /**
         * Event to Search
         */
        function search() {
            $log.debug('$scope.search');
            var search = $scope.searchTerm;
            var url = $scope.url;
            if (search.size > 3) {
                var appList = $scope.applicationList;
                $http.get(url).then(function(response) {
                    vm.examBoardList = response;
                });
            }
        }


        /**
         *View Basedata
         */
        function viewBaseData(id) {
            $log.debug('View basedata with id: ' + id);

            $state.go('examBaseDataViewer.viewById', {
                id: id
            });
        }
    }
})();
