angular.module('SelectionBoxes').directive('letterTypeSelection', ['LetterType', function(LetterType) {
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
        controller: ['LetterType', function(LetterType) {
            var vm = this;
            vm.letterTypes = [];

            LetterType.query().then(function(response) {
                vm.letterTypes = response.data;
            }, function(response) {
                alert("Error Retrieving LetterTypes");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/letterType/letter-type.selection.html',
    };
}]);
