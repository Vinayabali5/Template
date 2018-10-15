/**
 * This is the Exam Series Editor Dialog Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */


(function() {
    'use strict';

    angular
        .module('cid.exams.exam-series')
        .controller('ExamSeriesEditorDialogController', examSeriesEditorDialogController);

    examSeriesEditorDialogController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModalInstance', 'ExamSeries', 'examSeriesEntity'];

    function examSeriesEditorDialogController($log, $scope, $state, $rootScope, $uibModalInstance, ExamSeries, examSeriesEntity) {
        /*jshint validthis: true */
        var vm = this;
        vm.examSeries = examSeriesEntity !== undefined ? examSeriesEntity : {};

        vm.cancel = cancel;
        vm.save = save;


        var onSaveFinished = function(result) {
            $scope.$emit('exam-series-saved', result);
            $uibModalInstance.close(result);
        };

        function cancel() {
            $log.log('ExamSeriesEditorDialogController::clear called');
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            if (vm.examSeries.id) {
                ExamSeries.save(vm.examSeries, onSaveFinished);
            } else {
                ExamSeries.create(vm.examSeries, onSaveFinished);
            }
        }

    }

})();
