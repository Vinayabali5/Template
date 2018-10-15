/**
 * This is the Settings Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */



(function() {
    'use strict';

    angular
        .module('SettingsEditorDirective')
        .controller('SettingsEditorController', SettingsEditorController);


    SettingsEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'Settings'];

    function SettingsEditorController($log, $scope, $state, $rootScope, $uibModal, Settings) {
        /* jshint validthis:true */
        var vm = this;

        vm.settings = [];
        vm.searchText = '';
        vm.visible = false;
        vm.editSettings = editSettings;
        vm.addSettings = addSettings;
        vm.searchText = '';
        vm.visible = false;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            code: '',
            description: ''
        };

        function applyFilter() {
            vm.filterParams = {
                setting: $scope.filter.setting,
                description: $scope.filter.description
            };
        }

        function resetFilters() {

            vm.filterParams = {
                setting: '',
                description: ''
            };

            $scope.filter = {
                setting: '',
                description: ''
            };
        }

        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        vm.sortOrder = '+setting';

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

        function editSettings(id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/settings-editor/views/settings-editorDialog.html',
                controller: 'SettingsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    settingsEntity: function(Settings) {
                        return Settings.get(id).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("Failed to retrieve");
                        });
                    }
                }
            });
        }

        function addSettings() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/settings-editor/views/settings-editorDialog.html',
                controller: 'SettingsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    settingsEntity: function() {
                        var settings = {};
                        return settings;
                    }
                }
            });
        }


    }



})();
