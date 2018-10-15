angular.module('SelectionBoxes').directive('nationalitySelection', ['Nationality', function(Nationality) {
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
        controller: ['Nationality', function(Nationality) {
            var vm = this;
            vm.nationalities = [];

            Nationality.query().then(function(response) {
                vm.nationalities = response.data;
            }, function(response) {
                alert("Error Retrieving Nationalities");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/nationality/nationality.selection.html',

    };
}]);
