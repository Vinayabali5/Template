angular.module('SelectionBoxes').directive('genderSelection', ['Gender', function(Gender) {
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
        controller: ['Gender', function(Gender) {
            var vm = this;
            vm.genders = [];

            Gender.query().then(function(response) {
                vm.genders = response.data;
            }, function(response) {
                alert("Error Retrieving Genders");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/gender/gender.selection.html',

    };
}]);
