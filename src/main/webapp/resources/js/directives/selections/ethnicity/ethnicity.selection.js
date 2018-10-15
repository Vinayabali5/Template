angular.module('SelectionBoxes').directive('ethnicitySelection', ['Ethnicity', function(Ethnicity) {
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
        controller: ['Ethnicity', function(Ethnicity) {
            var vm = this;
            vm.ethnicities = [];
            Ethnicity.query().then(function(response) {
                vm.ethnicities = response.data;
            }, function(response) {
                alert("Error Retrieving Ethnicities");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/ethnicity/ethnicity.selection.html',

    };
}]);
