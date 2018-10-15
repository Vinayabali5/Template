/**
 * This is the Departments Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('DepartmentsEditorDirective')
        .controller('DepartmentsEditorController', DepartmentsEditorController);

    DepartmentsEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'Department'];

    function DepartmentsEditorController($log, $scope, $state, $rootScope, $uibModal, Department) {
        /* jshint validthis:true */
        var vm = this;
        vm.departments = [];
        vm.department = {};
        vm.searchText = '';
        vm.visible = false;

        vm.loadDepartments = loadDepartments;
        vm.editDepartments = editDepartments;
        vm.addDepartments = addDepartments;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            _facultyDescription: '',
            description: ''
        };

        function applyFilter() {
            vm.filterParams = {
                _facultyDescription: $scope.filter._facultyDescription,
                description: $scope.filter.description
            };
        }

        function resetFilters() {

            vm.filterParams = {
                _facultyDescription: '',
                description: ''
            };

            $scope.filter = {
                _facultyDescription: '',
                description: ''
            };
        }

        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        vm.sortOrder = '+description';

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


        function loadDepartments() {
            Department.query().then(function(response) {
                vm.departments = response.data;
                $log.info("Loading Department ");
            }, function(response) {
                $log.error("Failed to load Department");
            });
        }


        function editDepartments(departmentId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/departments-editor/views/departments-editorDialog.html',
                controller: 'DepartmentsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    departmentsEntity: function(Department) {
                        return Department.get(departmentId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadDepartments();
            });

        }


        function addDepartments() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/departments-editor/views/departments-editorDialog.html',
                controller: 'DepartmentsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    departmentsEntity: function() {
                        var departments = {};
                        return departments;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadDepartments();
            });

        }
    }

})();
