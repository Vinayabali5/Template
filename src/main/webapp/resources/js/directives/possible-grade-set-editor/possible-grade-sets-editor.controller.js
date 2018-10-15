/**
 * This is the PossibleGradeSets Editor Controller
 * 
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 * 
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('PossibleGradeSetsEditorDirective')
        .controller('PossibleGradeSetsEditorController', PossibleGradeSetsEditorController);

    PossibleGradeSetsEditorController.$inject = ['$uibModal', '$log', 'PossibleGradeSet'];

    function PossibleGradeSetsEditorController($uibModal, $log, PossibleGradeSet) {
        /* jshint validthis:true */
        var vm = this;
        vm.possibleGradeSets = [];

        vm.editPossibleGradeSets = editPossibleGradeSets;
        vm.addPossibleGradeSets = addPossibleGradeSets;

        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        vm.sortOrder = '+code';

        function changeSort(field) {
            if (vm.sortOrder == '+' + field) {
                vm.sortOrder = '-' + field;
            } else {
                vm.sortOrder = '+' + field;
            }
        }

        function isSortedAsc(fieldName) {
            if (vm.sortOrder == "+" + fieldName) {
                return true;
            }
            return false;
            // check if sortOrder is an array and if it contains fieldName
        }

        function isSortedDesc(fieldName) {
            if (vm.sortOrder == "-" + fieldName) {
                return true;
            }
            return false;
            // check if sortOrder is an array and if it contains fieldName
        }

        function editPossibleGradeSets(possibleGradeSetId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/possible-grade-set-editor/views/possible-grade-sets-editorDialog.html',
                controller: 'PossibleGradeSetsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    possibleGradeSetsEntity: function(PossibleGradeSet) {
                        return PossibleGradeSet.get(possibleGradeSetId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("Failed to retrieve");
                        });
                    },
                    possibleGradesArray: function(PossibleGradeSet) {
                        return PossibleGradeSet.getPossibleGrades(possibleGradeSetId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("Failed to retrieve possible grades");
                        });
                    }
                }
            });
        }


        function addPossibleGradeSets() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/possible-grade-set-editor/views/possible-grade-sets-editorDialog.html',
                controller: 'PossibleGradeSetsEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    possibleGradeSetsEntity: function() {
                        var possibleGradeSets = {};
                        return possibleGradeSets;
                    }
                }
            });
        }

    }

})();
