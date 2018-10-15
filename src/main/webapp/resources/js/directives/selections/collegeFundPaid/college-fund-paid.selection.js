angular.module('SelectionBoxes').directive('collegeFundPaidSelection', ['CollegeFundPaid', function(CollegeFundPaid) {
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
        controller: ['CollegeFundPaid', function(CollegeFundPaid) {
            var vm = this;
            vm.collegeFundPaids = [];

            CollegeFundPaid.query().then(function(response) {
                vm.collegeFundPaids = response.data;
            }, function(response) {
                alert("Error Retrieving Offer Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/collegeFundPaid/college-fund-paid.selection.html',

    };
}]);
