/**
 * This is the Possible GradeSets Editor Dialog Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */


(function() {
    'use strict';

    angular
        .module('PossibleGradeSetsEditorDirective')
        .controller('PossibleGradeSetsEditorDialogController', PossibleGradeSetsEditorDialogController);

    PossibleGradeSetsEditorDialogController.$inject = ['$uibModal', '$log', '$state', 'PossibleGradeSet', 'possibleGradeSetsEntity', 'possibleGradesArray', '$uibModalInstance', '$scope'];

    function PossibleGradeSetsEditorDialogController($uibModal, $log, state, PossibleGradeSet, possibleGradeSetsEntity, possibleGradesArray, $uibModalInstance, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.possibleGradeSets = possibleGradeSetsEntity;
        vm.possibleGrades = possibleGradesArray;

        vm.cancel = cancel;
        vm.save = save;


        var onSaveFinished = function(result) {
            $scope.$emit('possible-grade-sets-saved', result);
            $uibModalInstance.close(result);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            if (vm.possibleGradeSets.id) {
                PossibleGradeSet.save(vm.possibleGradeSets, onSaveFinished);
            } else {
                if (vm.possibleGradeSets.id !== null) {
                    PossibleGradeSet.create(vm.possibleGradeSets, onSaveFinished);
                }
            }
        }

    }


})();
