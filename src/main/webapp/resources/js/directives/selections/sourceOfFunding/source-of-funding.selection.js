angular.module('SelectionBoxes').directive('sourceOfFundingSelection', ['SourceOfFunding', function(SourceOfFunding) {
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
        controller: ['SourceOfFunding', function(SourceOfFunding) {
            var vm = this;
            vm.sourceOfFundings = [];
            SourceOfFunding.query().then(function(response) {
                vm.sourceOfFundings = response.data;
            }, function(err) {
                alert("Error Retrieving SourceOfFundings");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/sourceOfFunding/source-of-funding.selection.html',

    };
}]);
