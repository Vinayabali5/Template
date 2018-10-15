angular.module('Lookups').directive('addressLookup', function($log, Address) {
    return {
        restrict: 'E',
        scope: {
            addressId: '=?',
        },
        link: function(scope, element) {
            if (scope.addressId !== undefined) {
                Address.get(scope.addressId).then(function(response) {
                    scope.address = response.data;
                }, function(response) {
                    scope.address = "**ERROR**";
                    element.addClass('error');
                });
            }
        },
        templateUrl: 'js/directives/lookups/address/address.lookup.html',
    };
});
