/**
 * This is the PunctualityMonitorings Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('PunctualityMonitoringsEditorDirective')
        .controller('PunctualityMonitoringsEditorController', PunctualityMonitoringsEditorController);

    PunctualityMonitoringsEditorController.$inject = ['$log', '$uibModal', '$scope', 'PunctualityMonitoring'];

    function PunctualityMonitoringsEditorController($log, $uibModal, $scope, PunctualityMonitoring) {
        /* jshint validthis:true */
        var vm = this;
        vm.punctualityMonitorings = [];

        vm.loadPunctualityMonitorings = loadPunctualityMonitorings;
        vm.editPunctualityMonitorings = editPunctualityMonitorings;
        vm.addPunctualityMonitorings = addPunctualityMonitorings;

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

        function loadPunctualityMonitorings() {
            PunctualityMonitoring.query().then(function(response) {
                vm.punctualityMonitorings = response.data;
                $log.info("Loading Faculty ");
            }, function(response) {
                $log.error("Failed to load punctualityMonitorings");
            });
        }


        function editPunctualityMonitorings(punctualityMonitoringId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/punctuality-monitorings-editor/views/punctuality-monitorings-editorDialog.html',
                controller: 'PunctualityMonitoringsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    punctualityMonitoringsEntity: function(PunctualityMonitoring) {
                        return PunctualityMonitoring.get(punctualityMonitoringId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadPunctualityMonitorings();
            });

        }


        function addPunctualityMonitorings() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/punctuality-monitorings-editor/views/punctuality-monitorings-editor-addDialog.html',
                controller: 'PunctualityMonitoringsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    punctualityMonitoringsEntity: function() {
                        var punctualityMonitorings = {};
                        return punctualityMonitorings;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadPunctualityMonitorings();
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
