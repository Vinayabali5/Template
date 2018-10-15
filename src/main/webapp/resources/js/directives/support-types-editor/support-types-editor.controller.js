/**
 * This is the SupportTypes Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('SupportTypesEditorDirective')
        .controller('SupportTypesEditorController', SupportTypesEditorController);

    SupportTypesEditorController.$inject = ['$log', '$uibModal', '$scope', 'SupportType'];

    function SupportTypesEditorController($log, $uibModal, $scope, SupportType) {
        /* jshint validthis:true */
        var vm = this;
        vm.supportTypes = [];

        vm.loadSupportTypes = loadSupportTypes;
        vm.editSupportTypes = editSupportTypes;
        vm.addSupportTypes = addSupportTypes;

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

        function loadSupportTypes() {
            SupportType.query().then(function(response) {
                vm.supportTypes = response.data;
                $log.info("Loading Faculty ");
            }, function(response) {
                $log.error("Failed to load Faculties");
            });
        }


        function editSupportTypes(supportTypeId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/support-types-editor/views/support-types-editorDialog.html',
                controller: 'SupportTypesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    supportTypesEntity: function(SupportType) {
                        return SupportType.get(supportTypeId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadSupportTypes();
            });

        }


        function addSupportTypes() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/support-types-editor/views/support-types-editor-addDialog.html',
                controller: 'SupportTypesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    supportTypesEntity: function() {
                        var supportTypes = {};
                        return supportTypes;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadSupportTypes();
            });

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

    }

})();
