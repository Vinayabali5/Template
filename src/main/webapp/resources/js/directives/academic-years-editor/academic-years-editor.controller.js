/**
 * This is the AcademicYears Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('AcademicYearsEditorDirective')
        .controller('AcademicYearsEditorController', AcademicYearsEditorController);

    AcademicYearsEditorController.$inject = ['$log', '$uibModal', '$scope', 'AcademicYear'];

    function AcademicYearsEditorController($log, $uibModal, $scope, AcademicYear) {
        /* jshint validthis:true */
        var vm = this;
        vm.academicYears = [];

        vm.loadAcademicYears = loadAcademicYears;
        vm.editAcademicYears = editAcademicYears;
        vm.addAcademicYears = addAcademicYears;

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


        function loadAcademicYears() {
            AcademicYear.query().then(function(response) {
                vm.academicYears = response.data;
                $log.info("Loading AcademicYears ");
            }, function(response) {
                $log.error("Failed to load AcademicYears");
            });
        }


        function editAcademicYears(academicYearId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/academic-years-editor/views/academic-years-editorDialog.html',
                controller: 'AcademicYearsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    academicYearsEntity: ['AcademicYear', function(AcademicYear) {
                        return AcademicYear.get(academicYearId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }]
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadAcademicYears();
            });

        }


        function addAcademicYears() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/academic-years-editor/views/academic-years-editor-addDialog.html',
                controller: 'AcademicYearsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    academicYearsEntity: [function() {
                        var academicYears = {};
                        return academicYears;
                    }]
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadAcademicYears();
            });

        }
    }

})();
