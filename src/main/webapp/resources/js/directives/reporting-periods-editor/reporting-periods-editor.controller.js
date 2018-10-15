/**
 * This is the ReportingPeriods Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('ReportingPeriodsEditorDirective')
        .controller('ReportingPeriodsEditorController', ReportingPeriodsEditorController);

    ReportingPeriodsEditorController.$inject = ['$log', '$uibModal', '$scope', 'ReportingPeriod'];

    function ReportingPeriodsEditorController($log, $uibModal, $scope, ReportingPeriod) {
        /* jshint validthis:true */
        var vm = this;
        vm.reportingPeriods = [];

        vm.loadReportingPeriods = loadReportingPeriods;
        vm.editReportingPeriods = editReportingPeriods;
        vm.addReportingPeriods = addReportingPeriods;

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

        function loadReportingPeriods() {
            ReportingPeriod.getByYear().then(function(response) {
                vm.reportingPeriods = response.data;
                $log.info("Loading Faculty ");
            }, function(response) {
                $log.error("Failed to load Faculties");
            });
        }


        function editReportingPeriods(reportingPeriodId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/reporting-periods-editor/views/reporting-periods-editorDialog.html',
                controller: 'ReportingPeriodsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    reportingPeriodsEntity: function(ReportingPeriod) {
                        return ReportingPeriod.get(reportingPeriodId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadReportingPeriods();
            });

        }


        function addReportingPeriods() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/reporting-periods-editor/views/reporting-periods-editorDialog.html',
                controller: 'ReportingPeriodsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    reportingPeriodsEntity: function() {
                        var reportingPeriods = {};
                        return reportingPeriods;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadReportingPeriods();
            });

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

    }

})();
