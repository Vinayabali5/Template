/**
 * This is the EntryQualificationTypes Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('EntryQualificationTypesEditorDirective')
        .controller('EntryQualificationTypesEditorController', EntryQualificationTypesEditorController);

    EntryQualificationTypesEditorController.$inject = ['$log', '$uibModal', '$scope', 'EntryQualificationType'];

    function EntryQualificationTypesEditorController($log, $uibModal, $scope, EntryQualificationType) {
        /* jshint validthis:true */
        var vm = this;
        vm.entryQualificationTypes = [];

        vm.loadEntryQualificationTypes = loadEntryQualificationTypes;
        vm.editEntryQualificationTypes = editEntryQualificationTypes;
        vm.addEntryQualificationTypes = addEntryQualificationTypes;

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

        function loadEntryQualificationTypes() {
            EntryQualificationType.query().then(function(response) {
                vm.entryQualificationTypes = response.data;
                $log.info("Loading Faculty ");
            }, function(response) {
                $log.error("Failed to load Faculties");
            });
        }


        function editEntryQualificationTypes(entryQualificationTypeId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/entry-qualification-types-editor/views/entry-qualification-types-editorDialog.html',
                controller: 'EntryQualificationTypesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    entryQualificationTypesEntity: function(EntryQualificationType) {
                        return EntryQualificationType.get(entryQualificationTypeId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadEntryQualificationTypes();
            });

        }


        function addEntryQualificationTypes() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/entry-qualification-types-editor/views/entry-qualification-types-editorDialog.html',
                controller: 'EntryQualificationTypesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    entryQualificationTypesEntity: function() {
                        var entryQualificationTypes = {};
                        return entryQualificationTypes;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadEntryQualificationTypes();
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
