angular.module('SelectionBoxes').directive('offerTypeSelection', ['OfferType', function(OfferType) {
    return {
        restrict: 'E',
        scope: {
            id: '@',
            class: '@',
            readonly: '=?',
            ngmodelvar: '=ngModel'

        },
        link: function(scope, element, attrs) {
            element[0].removeAttribute('id');
            element[0].removeAttribute('class');
            element[0].removeAttribute('readonly');
            element[0].disable = scope.readonly;
        },
        controller: ['OfferType', function(OfferType) {
            var vm = this;
            vm.offerTypes = [];

            OfferType.query().then(function(response) {
                vm.offerTypes = response.data;
            }, function(response) {
                alert("Error Retrieving Offer Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/offerType/offer-type.selection.html',

    };
}]);
