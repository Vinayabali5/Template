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
        .controller('AddressEditorPostcodeLookupDialogController', AddressEditorPostcodeLookupDialogController);

    AddressEditorPostcodeLookupDialogController.$inject = ['$log', '$scope', '$state', '$uibModal', '$uibModalInstance', 'postcodeLookups', 'PostcodeLookup'];

    function AddressEditorPostcodeLookupDialogController($log, $scope, $state, $uibModal, $uibModalInstance, postcodeLookups, PostcodeLookup) {
        /* jshint validthis:true */
        var vm = this;
        vm.postcode = postcodeLookups.data;
        vm.selectedPostcodeId = null;
        vm.selectAddress = selectAddress;
        vm.clear = clear;

        function selectAddress() {
            $log.log('AddressEditorPostcodeLookupDialogController::select called');
            if (vm.selectedPostCode === null) {
                // No postcode selected
            }
            PostcodeLookup.retrieve(vm.selectedPostcodeId).then(function(response) {
                $scope.$emit('address-selected', response.data);
                $uibModalInstance.close(response.data);
            });
        }

        function clear() {
            $log.log('AddressEditorPostcodeLookupDialogController::clear called');
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
