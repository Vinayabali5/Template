/**
 * This controller is used by the AddressEditorDirective.
 *
 * Applied Style: [Y001, Y002, Y010, Y022, Y023, Y024, Y032, Y033, Y034] *
 *
 */

(function() {
    'use strict';

    angular
        .module('AddressEditorDirective')
        .controller('AddressEditorDialogController', AddressEditorDialogController);

    AddressEditorDialogController.$inject = ['$log', '$scope', '$filter', '$state', '$uibModalInstance', '$uibModal', '$rootScope', 'addressEntity', 'Address', 'PostcodeLookup'];

    function AddressEditorDialogController($log, $scope, $filter, $state, $uibModalInstance, $uibModal, $rootScope, addressEntity, Address, PostcodeLookup) {
        /* jshint validthis:true */
        var vm = this;

        // Public Interface
        vm.address = addressEntity !== undefined ? addressEntity : {};
        vm.postcode = [];
        vm.onSaveFinished = onSaveFinished;
        vm.save = save;
        vm.cancel = cancel;
        vm.postcodeLookup = postcodeLookup;


        // Private Interface
        function onSaveFinished(result) {
            $scope.$emit('address-saved', result);
            $uibModalInstance.close(result);
        }

        $scope.$watch('ctrl.address.postcode', function(postcode) {
            $scope.ctrl.address.postcode = $filter('uppercase')(postcode);
        }, true);


        /**
         * This saves the address and closes that dialog box
         */
        function save() {
            $log.log('AddressDialogController::save called');
            $log.info(vm.address);
            if (vm.address.id) {
                // update the contact information
                Address.save(vm.address, onSaveFinished);
            } else {
                // Create New Address
                Address.create(vm.address, onSaveFinished);
            }

        }

        /**
         * This closes the address editor dialog box without saving
         */
        function cancel() {
            $log.log('AddressDialogController::clear called');
            $uibModalInstance.dismiss('cancel');
        }

        //Lookup button
        function postcodeLookup(postcode) {
            $log.log('AddressEditorPostcodeLookupController::lookup called');
            vm.modalOptions = {
                templateUrl: 'js/directives/address-editor/views/addressEditorPostcodeLookupDialog.html',
                controller: 'AddressEditorPostcodeLookupDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    postcodeLookups: function(PostcodeLookup) {
                        return PostcodeLookup.search(postcode);
                    }
                }
            };
            $uibModal.open(vm.modalOptions).result.then(function(response) {
                vm.address.line1 = response.line1;
                vm.address.line2 = response.line2;
                vm.address.line3 = response.line3;
                vm.address.line4 = response.line4;
                vm.address.line5 = response.line5;
                vm.address.town = response.town;
                vm.address.county = response.county;
                vm.address.buildingName = response.buildingName;
                vm.address.subBuilding = response.subBuilding;
                $log.log(response);
            });
        }

    }
})();
