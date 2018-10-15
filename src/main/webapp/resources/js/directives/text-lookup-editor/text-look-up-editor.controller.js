/**
 * This is the TextLookup Editor Controller, it is used to handle the TextLookup editor controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */



(function() {
    'use strict';

    angular
        .module('TextLookupEditorDirective')
        .controller('TextLookupEditorController', TextLookupEditorController);

    TextLookupEditorController.$inject = ['$log', '$scope', '$uibModal', 'TextLookup'];

    function TextLookupEditorController($log, $scope, $uibModal, TextLookup) {
        /* jshint validthis:true */
        var vm = this;
        vm.textLookups = [];
        vm.searchText = '';
        vm.visible = false;

        vm.loadTextLookup = loadTextLookup;
        vm.editTextLookup = editTextLookup;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            name: '',
            text: '',
            description: ''
        };

        function applyFilter() {
            vm.filterParams = {
                name: $scope.filter.name,
                text: $scope.filter.text,
                description: $scope.filter.description
            };
        }

        function resetFilters() {

            vm.filterParams = {
                name: '',
                text: '',
                description: ''
            };

            $scope.filter = {
                name: '',
                text: '',
                description: ''
            };
        }
        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        vm.sortOrder = '+name';

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

        //Private Interface

        function loadTextLookup() {
            TextLookup.query().then(function(response) {
                $log.info('II TextLookup Loaded');
                vm.textLookups = response.data;
                $log.info("Loading textLookups ");
            }, function(response) {
                $log.error("Failed to load textLookups");
            });
        }

        function editTextLookup(id) {
            $log.log('TextLookupDetailsDirectiveController::editContact called');
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/text-lookup-editor/views/text-lookup-editor-dialog.html',
                controller: 'TextLookupEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    textLookupEntity: function(TextLookup) {
                        return TextLookup.get(id).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });
            modalInstance.result.then().finally(function() {
                vm.loadTextLookup(vm.textLookup.id);
            });
        }

    }

})();
