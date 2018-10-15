angular.module('SelectionBoxes').directive('entryQualificationSelection', ['EntryQualification', function(EntryQualification) {
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
        controller: ['EntryQualification', function(EntryQualification) {
            var vm = this;
            vm.entryQualifications = [];

            EntryQualification.query().then(function(response) {
                vm.entryQualifications = response.data;
            }, function(response) {
                alert("Error Retrieving EntryQualifications");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/entryQualification/entry-qualification.selection.html',
    };
}]);
