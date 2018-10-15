/**
 * This is the Blocks Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('BlocksEditorDirective')
        .controller('BlocksEditorController', BlocksEditorController);

    BlocksEditorController.$inject = ['$log', '$uibModal', 'Block'];

    function BlocksEditorController($log, $uibModal, Block) {
        /* jshint validthis:true */
        var vm = this;
        vm.blocks = [];

        vm.loadBlocks = loadBlocks;
        vm.editBlocks = editBlocks;
        vm.addBlocks = addBlocks;


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



        function loadBlocks() {
            Block.query().then(function(response) {
                vm.blocks = response.data;
                $log.info("Loading Blocks");
            }, function(response) {
                $log.error("Failed to load Blocks");
            });
        }


        function editBlocks(blockId) {
            $log.log("BlocksEditorController :: editBlocks called");
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/blocks-editor/views/blocks-editorDialog.html',
                controller: 'BlocksEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    blocksEntity: function(Block) {
                        return Block.get(blockId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadBlocks();
            });

        }


        function addBlocks() {
            $log.log("BlocksEditorController :: addBlocks called");
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/blocks-editor/views/blocks-editorDialog.html',
                controller: 'BlocksEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    blocksEntity: function() {
                        var blocks = {};
                        return blocks;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadBlocks();
            });

        }
    }

})();
