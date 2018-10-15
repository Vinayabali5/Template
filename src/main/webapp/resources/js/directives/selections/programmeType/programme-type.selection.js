angular.module('SelectionBoxes').directive('programmeTypeSelection', ['ProgrammeType', function(ProgrammeType) {
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
        controller: ['ProgrammeType', function(ProgrammeType) {
            var vm = this;
            vm.programmeTypes = [];

            ProgrammeType.query().then(function(response) {
                vm.programmeTypes = response.data;
            }, function(response) {
                alert("Error Retrieving Programme Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/programmeType/programme-type.selection.html',

    };
}]);
