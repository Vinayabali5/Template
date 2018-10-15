angular.module('SelectionBoxes').directive('fundingModelSelection', ['FundingModel', function(FundingModel) {
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
        controller: ['FundingModel', function(FundingModel) {
            var vm = this;
            vm.fundingModels = [];
            FundingModel.query().then(function(response) {
                vm.fundingModels = response.data;
            }, function(response) {
                alert("Error Retrieving FundingModels");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/fundingModel/funding-model.selection.html',

    };
}]);
