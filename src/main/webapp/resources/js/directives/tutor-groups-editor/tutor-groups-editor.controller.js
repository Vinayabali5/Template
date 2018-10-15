/**
 * This is the Tutor Groups Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('TutorGroupsEditorDirective')
        .controller('TutorGroupsEditorController', TutorGroupsEditorController);

    TutorGroupsEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'TutorGroup'];

    function TutorGroupsEditorController($log, $scope, $state, $rootScope, $uibModal, TutorGroup) {
        /* jshint validthis:true */
        var vm = this;
        vm.tutorGroups = [];
        vm.searchText = '';
        vm.visible = false;

        vm.editTutorGroups = editTutorGroups;
        vm.addTutorGroups = addTutorGroups;

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
                code: $scope.filter.code,
                description: $scope.filter.description
            };
        }

        function resetFilters() {

            vm.filterParams = {
                code: '',
                description: ''
            };

            $scope.filter = {
                code: '',
                description: ''
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

        function editTutorGroups(tutorGroupId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/tutor-groups-editor/views/tutor-groups-editorDialog.html',
                controller: 'TutorGroupsEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    tutorGroupsEntity: function(TutorGroup) {
                        return TutorGroup.get(tutorGroupId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("Failed to retrieve");
                        });
                    }
                }
            });
        }

        function addTutorGroups() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/tutor-groups-editor/views/tutor-groups-editorDialog.html',
                controller: 'TutorGroupsEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    tutorGroupsEntity: function() {
                        var tutorGroups = {};
                        return tutorGroups;
                    }
                }
            });
        }


    }

})();
