/**
 * This is the PossibleGrades Editor Controller
 * 
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 * 
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('PossibleGradesEditorDirective')
        .controller('PossibleGradesEditorController', PossibleGradesEditorController);

    PossibleGradesEditorController.$inject = ['$uibModal', '$log', 'PossibleGrade'];

    function PossibleGradesEditorController($uibModal, $log, PossibleGrade) {
        /* jshint validthis:true */
        var vm = this;
        vm.possibleGrades = [];

        vm.editPossibleGrades = editPossibleGrades;
        vm.addPossibleGrades = addPossibleGrades;

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

        function editPossibleGrades(possibleGradeId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/possible-grades-editor/views/possible-grades-editorDialog.html',
                controller: 'PossibleGradesEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    possibleGradesEntity: function(PossibleGrade) {
                        return PossibleGrade.get(possibleGradeId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("Failed to retrieve");
                        });
                    }
                }
            });
        }


        function addPossibleGrades() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/possible-grades-editor/views/possible-grades-editorDialog.html',
                controller: 'PossibleGradesEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    possibleGradesEntity: function() {
                        var possibleGrades = {};
                        return possibleGrades;
                    }
                }
            });
        }

    }

})();
