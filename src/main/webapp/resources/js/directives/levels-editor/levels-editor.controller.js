/**
 * This is the Levels Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('LevelsEditorDirective')
        .controller('LevelsEditorController', LevelsEditorController);

    LevelsEditorController.$inject = ['$log', '$uibModal', '$scope', 'Level'];

    function LevelsEditorController($log, $uibModal, $scope, Level) {
        /* jshint validthis:true */
        var vm = this;
        vm.levels = [];

        vm.loadLevels = loadLevels;
        vm.editLevels = editLevels;
        vm.addLevels = addLevels;

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


        function loadLevels() {
            Level.query().then(function(response) {
                vm.levels = response.data;
                $log.info("Loading Levels ");
            }, function(response) {
                $log.error("Failed to load Levels");
            });
        }


        function editLevels(levelId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/levels-editor/views/levels-editorDialog.html',
                controller: 'LevelsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    levelsEntity: function(Level) {
                        return Level.get(levelId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadLevels();
            });

        }


        function addLevels() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/levels-editor/views/levels-editorDialog.html',
                controller: 'LevelsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    levelsEntity: function() {
                        var levels = {};
                        return levels;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadLevels();
            });

        }
    }

})();
