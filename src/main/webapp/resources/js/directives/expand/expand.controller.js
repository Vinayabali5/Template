/**
 * 
 */
(function() {
    'use strict';

    angular
        .module('ExpandDirective')
        .controller('ExpandDirectiveController', ExpandDirectiveController);

    function ExpandDirectiveController($rootScope, $scope, $http, $uibModal) {
        /* jshint validthis:true */
        var vm = this;

        $scope.expand = expand;
        $scope.collapse = collapse;

        // //////////////////////////////////////////////////////////////

        console.log("ExpandDirectiveController loaded");
        init();

        function collapse() {
            $scope.expanded = false;
        }

        function expand() {
            $scope.expanded = true;
        }

        function init() {
            //        	if ($scope.expanded === undefined) {
            //        		$scope.expanded = false;
            //        	}
        }

    }


})();
