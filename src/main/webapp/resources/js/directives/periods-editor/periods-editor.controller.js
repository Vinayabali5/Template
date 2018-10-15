/**
 * This is the Periods Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */


(function() {
    'use strict';

    angular
        .module('PeriodsEditorDirective')
        .controller('PeriodsEditorController', PeriodsEditorController);

    PeriodsEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'Period'];

    function PeriodsEditorController($log, $scope, $state, $rootScope, $uibModal, Period) {
        /* jshint validthis:true */
        var vm = this;
        vm.periods = [];
        vm.period = {};
        vm.searchText = '';
        vm.visible = false;

        vm.editPeriods = editPeriods;
        vm.addPeriods = addPeriods;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            code: '',
            description: '',
            _blockDescription: ''
        };

        function applyFilter() {
            vm.filterParams = {
                code: $scope.filter.code,
                description: $scope.filter.description,
                _blockDescription: $scope.filter._blockDescription
            };
        }

        function resetFilters() {

            vm.filterParams = {
                code: '',
                description: '',
                _blockDescription: ''

            };

            $scope.filter = {
                code: '',
                description: '',
                _blockDescription: ''
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


        function editPeriods(periodId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/periods-editor/views/periods-editorDialog.html',
                controller: 'PeriodsEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    periodsEntity: function(Period) {
                        return Period.get(periodId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("Failed to retrieve");
                        });
                    }
                }
            });
        }

        function addPeriods() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/periods-editor/views/periods-editorDialog.html',
                controller: 'PeriodsEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    periodsEntity: function() {
                        var periods = {};
                        return periods;
                    }
                }
            });
        }



    }



})();
