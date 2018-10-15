angular.module('SelectionBoxes').directive('tutorGroupSelection', ['TutorGroup', function(TutorGroup) {
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
        controller: ['TutorGroup', function(TutorGroup) {
            var vm = this;
            vm.tutorGroups = [];

            TutorGroup.query().then(function(response) {
                vm.tutorGroups = response.data;
            }, function(response) {
                alert("Error Retrieving TutorGroups");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/tutorGroup/tutor-group.selection.html',

    };
}]);
