/**
 * This is the Schools Editor Controller
 * 
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 * 
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('SchoolsEditorDirective')
        .controller('SchoolsEditorController', SchoolsEditorController);

    SchoolsEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'School'];


    function SchoolsEditorController($log, $scope, $state, $rootScope, $uibModal, School) {
        /* jshint validthis:true */

        var vm = this;
        vm.schools = [];
        vm.school = {};
        vm.searchText = '';
        vm.visible = false;

        vm.editSchools = editSchools;
        vm.addSchools = addSchools;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            name: '',
            _typeDescription: ''
        };

        function applyFilter() {
            vm.filterParams = {
                name: $scope.filter.name,
                _typeDescription: $scope.filter._typeDescription
            };
        }

        function resetFilters() {

            vm.filterParams = {
                name: '',
                _typeDescription: ''
            };

            $scope.filter = {
                name: '',
                _typeDescription: ''
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




        function editSchools(schoolId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/schools-editor/views/school-editorDialog.html',
                controller: 'SchoolsEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    schoolsEntity: function(School) {
                        return School.get(schoolId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("Failed to retrieve");
                        });
                    }
                }
            });
        }

        function addSchools() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/schools-editor/views/school-editorDialog.html',
                controller: 'SchoolsEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    schoolsEntity: function() {
                        var schools = {};
                        return schools;
                    }
                }
            });
        }

    }
})();
