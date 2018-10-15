/**
 * This is the EntryQualifications Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('EntryQualificationsEditorDirective')
        .controller('EntryQualificationsEditorController', EntryQualificationsEditorController);

    EntryQualificationsEditorController.$inject = ['$log', '$uibModal', '$scope', 'EntryQualification'];

    function EntryQualificationsEditorController($log, $uibModal, $scope, EntryQualification) {
        /* jshint validthis:true */
        var vm = this;
        vm.entryQualifications = [];
        vm.searchText = '';
        vm.visible = false;

        vm.loadEntryQualifications = loadEntryQualifications;
        vm.editEntryQualifications = editEntryQualifications;
        vm.addEntryQualifications = addEntryQualifications;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            _entryQualificationTypeDescription: '',
            title: ''
        };

        function applyFilter() {
            vm.filterParams = {
                _entryQualificationTypeDescription: $scope.filter._entryQualificationTypeDescription,
                title: $scope.filter.title
            };
        }

        function resetFilters() {

            vm.filterParams = {
                _entryQualificationTypeDescription: '',
                title: ''
            };

            $scope.filter = {
                _entryQualificationTypeDescription: '',
                title: ''
            };
        }

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

        function loadEntryQualifications() {
            EntryQualification.query().then(function(response) {
                vm.entryQualifications = response.data;
                $log.info("Loading Faculty ");
            }, function(response) {
                $log.error("Failed to load Faculties");
            });
        }


        function editEntryQualifications(entryQualificationId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/entry-qualifications-editor/views/entry-qualifications-editorDialog.html',
                controller: 'EntryQualificationsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    entryQualificationsEntity: function(EntryQualification) {
                        return EntryQualification.get(entryQualificationId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadEntryQualifications();
            });

        }


        function addEntryQualifications() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/entry-qualifications-editor/views/entry-qualifications-editorDialog.html',
                controller: 'EntryQualificationsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    entryQualificationsEntity: function() {
                        var entryQualifications = {};
                        return entryQualifications;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadEntryQualifications();
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
