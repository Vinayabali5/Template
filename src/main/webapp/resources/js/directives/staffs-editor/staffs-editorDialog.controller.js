/**
 * This is the Staff Editor Dialog Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */


(function() {
    'use strict';
    angular
        .module('StaffsEditorDirective')
        .controller('StaffsEditorDialogController', StaffsEditorDialogController);

    StaffsEditorDialogController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModalInstance', 'Staff', 'staffsEntity', 'Person'];

    function StaffsEditorDialogController($log, $scope, $state, $rootScope, $uibModalInstance, Staff, staffsEntity, Person) {
        /* jshint validthis:true */
        var vm = this;
        vm.staffs = staffsEntity !== undefined ? staffsEntity : {};

        vm.cancel = cancel;
        vm.save = save;
        vm.add = add;

        var onSaveFinished = function(result) {
            $scope.$emit('staffs-saved', result);
            $uibModalInstance.close(result);
        };

        function add() {
            if (vm.staffs.person.roles.id) {
                var roles = vm.staffs.person.roles;
                roles.push({
                    id: roles.id,
                    roleName: roles.roleName
                });
                Person.save(vm.staffs.person).then(function(response) {
                    Person.get(vm.staffs.personId).then(function(response) {
                        vm.staffs.person = response.data;
                    });

                });
            }
        }


        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            if (vm.staffs.id) {
                Staff.save(vm.staffs, onSaveFinished);
            } else {
                if (vm.staffs.id !== null) {
                    Staff.create(vm.staffs, onSaveFinished);
                }
            }
        }

    }


})();
