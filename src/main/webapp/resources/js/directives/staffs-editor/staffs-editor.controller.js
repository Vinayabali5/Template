/**
 * This is the Staffs Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('StaffsEditorDirective')
        .controller('StaffsEditorController', StaffsEditorController);

    StaffsEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'Staff'];

    function StaffsEditorController($log, $scope, $state, $rootScope, $uibModal, Staff) {
        /* jshint validthis:true */
        var vm = this;
        if ($scope.staffs) {
            vm.staffs = $scope.staffs;
        } else {
            vm.staffs = [];
        }
        vm.staff = {};

        vm.searchText = '';
        vm.visible = false;

        vm.loadStaffs = loadStaffs;
        vm.editStaffs = editStaffs;
        vm.addStaffs = addStaffs;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            initials: '',
            knownAs: ''
        };

        function applyFilter() {
            vm.filterParams = {
                initials: $scope.filter.initials,
                knownAs: $scope.filter.knownAs
            };
        }

        function resetFilters() {

            vm.filterParams = {
                initials: '',
                knownAs: ''
            };

            $scope.filter = {
                initials: '',
                knownAs: ''
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



        function loadStaffs() {
            Staff.query().then(function(response) {
                vm.staffs = response.data;
                $log.info("Loading Staffs");
            }, function(response) {
                $log.error("Failed to load Staffs");
            });
        }


        function editStaffs(staffId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/staffs-editor/views/staffs-editorDialog.html',
                controller: 'StaffsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    staffsEntity: function(Staff) {
                        return Staff.get(staffId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadStaffs();
            });

        }


        function addStaffs() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/staffs-editor/views/staffs-editorDialog.html',
                controller: 'StaffsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    staffsEntity: function() {
                        var staffs = {};
                        return staffs;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadStaffs();
            });

        }
    }

})();
