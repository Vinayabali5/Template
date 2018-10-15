/**
 * This is the identificationViolations Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('IdentificationViolationsEditorDirective')
        .controller('IdentificationViolationsEditorController', IdentificationViolationsEditorController);

    IdentificationViolationsEditorController.$inject = ['$log', '$scope', '$uibModal', 'IdentificationViolation'];

    function IdentificationViolationsEditorController($log, $scope, $uibModal, IdentificationViolation) {
        /* jshint validthis:true */
        var vm = this;

        vm.studentId = vm.studentId ? vm.studentId : undefined;
        vm.identificationViolations = vm.identificationViolations ? vm.identificationViolations : [];
        vm.init = init;
        vm.loadIdentificationViolation = loadIdentificationViolation;
        vm.editIdentificationViolation = editIdentificationViolation;
        vm.addIdentificationViolation = addIdentificationViolation;
        vm.deleteIdentificationViolation = deleteIdentificationViolation;



        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        vm.sortOrder = '-date';

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

        function init() {
            $log.info('II IdentificationViolation Editor Initialised');
            vm.loadIdentificationViolation(vm.studentId);
        }

        function loadIdentificationViolation() {
            $log.info('II Loading IdentificationViolation Data');
            IdentificationViolation.query().then(function(response) {
                $log.log('IdentificationViolation:: load called');
                vm.identificationViolations = response.data;
            }, function(response) {
                $log.error('EE IdentificationViolation could not be loaded');
            });
        }

        function editIdentificationViolation(idViolationId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/identification-violation-editor/views/identification-violation-editor-dialog.html',
                controller: 'IdentificationViolationsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'sm',
                resolve: {
                    identificationViolationEntity: function(IdentificationViolation) {
                        return IdentificationViolation.get(idViolationId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });
        }

        // Delete the IdentificationViolation
        function deleteIdentificationViolation(idViolationId) {
            $log.log('IdentificationViolationsEditorController::deleteIdentificationViolation called');
            if (idViolationId) {
                var msg = "Are you sure you want to delete this IdentificationViolation?";
                if (window.confirm(msg)) {
                    IdentificationViolation.delete(idViolationId).then(function(response) {
                        $log.info("II IdentificationViolation ($idViolationId) has been deleted");
                    }, function(response) {
                        $log.info("EE A problem occurred trying to delete IdViolation ($idViolationId)");
                    }).finally(function() {
                        vm.loadIdentificationViolation();
                    });
                }
            }
        }


        function addIdentificationViolation() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/identification-violation-editor/views/identification-violation-editor-dialog.html',
                controller: 'IdentificationViolationsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'sm',
                resolve: {
                    identificationViolationEntity: function() {
                        var identificationViolations = {
                            studentId: $scope.studentId,
                            date: new Date()
                        };
                        return identificationViolations;
                    }
                }
            });
        }



    }

})();
