/**
 * This is the Registers Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */



(function() {
    'use strict';

    angular
        .module('RegistersEditorDirective')
        .controller('RegistersEditorController', RegistersEditorController);

    RegistersEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'MasterRegister'];


    function RegistersEditorController($log, $scope, $state, $rootScope, $uibModal, MasterRegister) {
        /* jshint validthis:true */
        var vm = this;
        vm.registers = [];

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


        // Operations
        vm.loadRegisters = loadRegisters;
        vm.editRegister = editRegister;
        vm.addRegister = addRegister;
        vm.toggleVisibility = toggleVisibility;
        vm.applyFilter = applyFilter;


        function loadRegisters(studentId) {
            $log.info('II Loading Registers Data');
            MasterRegister.get(studentId).then(function(response) {
                $log.info('II Registers Loaded');
                vm.registers = response.data;
            }, function(response) {
                $log.error('EE Registers could not be loaded');
            });
        }



        function editRegister(id) {
            $log.log('RegistersEditorController::editRegister called');

            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/registersEditor/views/registersEditorDialog.html',
                controller: 'RegistersEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    registerEntity: function(MasterRegister) {
                        return MasterRegister.getById(id).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });
            // Reload Registers after dialog closed
            modalInstance.result.then().finally(function() {
                vm.loadRegisters(vm.studentId);
            });
        }

        function addRegister(studentId) {
            $log.log('RegistersEditorController::editRegister called');
            //  if (studentId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/registersEditor/views/registersEditorDialog.html',
                controller: 'RegistersEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    registerEntity: function() {
                        var register = {};
                        register.studentId = studentId;
                        return register;
                    }
                }
            });
            // Reload Registers after dialog closed
            modalInstance.result.then().finally(function() {
                vm.loadRegisters(vm.studentId);
            });
            //        } else {
            //            $log.error('EE No Person ID Specified');
            //        }
        }


        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            subjectCode: '',
            group: '',
            _sessionPeriod: '',
            attendanceId: ''
        };

        function applyFilter() {
            vm.filterParams = {
                subjectCode: $scope.filter.subjectCode,
                group: $scope.filter.group,
                _sessionPeriod: $scope.filter._sessionPeriod,
                attendanceId: $scope.filter.attendanceId
            };
        }
    }

})();
