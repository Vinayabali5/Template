/**
 * This is the Correspondences Table Directive Controller ,used CorrespondencesTableDirective
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */


(function() {
    'use strict';

    angular
        .module('CorrespondencesTableDirective')
        .controller('CorrespondencesTableDirectiveController', CorrespondencesTableDirectiveController);

    CorrespondencesTableDirectiveController.$inject = ['$log', '$scope', '$state', '$rootScope', 'Correspondence'];

    function CorrespondencesTableDirectiveController($log, $scope, $state, $rootScope, Correspondence) {
        /* jshint validthis:true */
        var vm = this;
        vm.correspondences = [];
        vm.init = init;

        function init() {
            $log.log('CorrespondenceTableDirectiveController::init called');
        }
    }
})();
