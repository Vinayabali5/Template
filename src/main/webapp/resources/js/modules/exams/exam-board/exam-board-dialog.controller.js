/**
 * The ExamBoardEditorDialog module for editing an individual ExamBoard 
 */
(function() {
    'use strict';

    angular
        .module('cid.exams.exam-board-editor')
        .controller('ExamBoardDialogController', examBoardDialogController);

    examBoardDialogController.$inject = ['$log', '$scope', '$state', '$uibModalInstance', 'entity', 'ExamBoard'];

    function examBoardDialogController($log, $scope, $state, $uibModalInstance, entity, ExamBoard) {
        /*jshint validthis: true */
        var vm = this;

        $scope.cancel = cancel;
        $scope.create = create;
        $scope.currentExamBoard = entity.data;
        $scope.msg = '';
        $scope.save = save;

        //////////////////////////////////////////////////////////////////

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function create() {
            var currentExamBoard = $scope.currentExamBoard;
            $log.debug($scope.currentExamBoard);
            if (currentExamBoard.boardCode !== null) {
                ExamBoard.create($scope.currentExamBoard, onSaveFinished);
            }
        }

        function onSaveFinished(result) {
            $scope.$emit('exam board-saved', result);
            $uibModalInstance.close(result);
        }



        function save() {
            var currentExamBoard = $scope.currentExamBoard;
            $log.debug($scope.currentExamBoard);
            if (currentExamBoard.id !== null && currentExamBoard.id !== undefined) {
                // Update Existing ExamBoard
                ExamBoard.save($scope.currentExamBoard, onSaveFinished);
            }
        }
    }

})();
