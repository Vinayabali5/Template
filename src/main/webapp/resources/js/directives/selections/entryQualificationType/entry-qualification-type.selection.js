angular.module('SelectionBoxes').directive('entryQualificationTypeSelection', ['EntryQualificationType', function(EntryQualificationType) {
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
        controller: ['EntryQualificationType', function(EntryQualificationType) {
            var vm = this;
            vm.entryQualificationTypes = [];

            EntryQualificationType.query().then(function(response) {
                vm.entryQualificationTypes = response.data;
            }, function(response) {
                alert("Error Retrieving EntryQualificationTypes");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/entryQualificationType/entry-qualification-type.selection.html',
    };
}]);
