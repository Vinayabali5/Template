/**
 * This is the ReferralReasons Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('ReferralReasonsEditorDirective')
        .controller('ReferralReasonsEditorController', ReferralReasonsEditorController);

    ReferralReasonsEditorController.$inject = ['$log', '$uibModal', '$scope', 'ReferralReason'];

    function ReferralReasonsEditorController($log, $uibModal, $scope, ReferralReason) {
        /* jshint validthis:true */
        var vm = this;
        vm.referralReasons = [];

        vm.loadReferralReasons = loadReferralReasons;
        vm.editReferralReasons = editReferralReasons;
        vm.addReferralReasons = addReferralReasons;

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

        function loadReferralReasons() {
            ReferralReason.query().then(function(response) {
                vm.referralReasons = response.data;
                $log.info("Loading Faculty ");
            }, function(response) {
                $log.error("Failed to load Faculties");
            });
        }


        function editReferralReasons(referralReasonId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/referral-reasons-editor/views/referral-reasons-editorDialog.html',
                controller: 'ReferralReasonsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    referralReasonsEntity: function(ReferralReason) {
                        return ReferralReason.get(referralReasonId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadReferralReasons();
            });

        }


        function addReferralReasons() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/referral-reasons-editor/views/referral-reasons-editor-addDialog.html',
                controller: 'ReferralReasonsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    referralReasonsEntity: function() {
                        var referralReasons = {};
                        return referralReasons;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadReferralReasons();
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
