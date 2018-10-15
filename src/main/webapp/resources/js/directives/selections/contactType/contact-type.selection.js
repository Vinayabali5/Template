angular.module('SelectionBoxes').directive('contactTypeSelection', ['ContactType', function(ContactType) {
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
        controller: ['ContactType', function(ContactType) {
            var vm = this;
            vm.contactTypes = [];

            ContactType.query().then(function(response) {
                vm.contactTypes = response.data;
            }, function(response) {
                alert("Error Retrieving Contact Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/contactType/contact-type.selection.html',

    };
}]);
