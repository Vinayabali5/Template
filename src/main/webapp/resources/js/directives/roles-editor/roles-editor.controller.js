/**
 * This is the Roles Editor Controller
 * 
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 * 
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('RolesEditorDirective')
        .controller('RolesEditorController', RolesEditorController);

    RolesEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'Role'];

    function RolesEditorController($log, $scope, $state, $rootScope, $uibModal, Role) {
        /* jshint validthis:true */
        var vm = this;

        vm.roles = [];
        vm.role = {};
        vm.searchText = '';
        vm.visible = false;

        vm.loadRoles = loadRoles;
        vm.editRoles = editRoles;
        vm.addRoles = addRoles;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            roleName: '',
            description: ''
        };

        function applyFilter() {
            vm.filterParams = {
                roleName: $scope.filter.roleName,
                description: $scope.filter.description
            };
        }

        function resetFilters() {

            vm.filterParams = {
                roleName: '',
                description: ''
            };

            $scope.filter = {
                roleName: '',
                description: ''
            };
        }

        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        vm.sortOrder = '+roleName';

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



        function loadRoles() {
            Role.query().then(function(response) {
                vm.roles = response.data;
                $log.info("Loading Exam Results");
            }, function(response) {
                $log.error("Failed to load Results");
            });
        }


        function editRoles(roleId) {
            $log.log("RoleEditorController :: editRoles called");
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/roles-editor/views/roles-editorDialog.html',
                controller: 'RolesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    roleEntity: function(Role) {
                        return Role.get(roleId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadRoles();
            });

        }


        function addRoles() {
            $log.log("RoleEditorController :: addRoles called");
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/roles-editor/views/roles-editorDialog.html',
                controller: 'RolesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    roleEntity: function() {
                        var roles = {};
                        return roles;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadRoles();
            });

        }


    }

})();
