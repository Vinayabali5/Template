angular.module('SelectionBoxes').directive('noteTypeSelection', ['NoteType', function(NoteType) {
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
        controller: ['NoteType', function(NoteType) {
            var vm = this;
            vm.noteTypes = [];

            NoteType.query().then(function(response) {
                vm.noteTypes = response.data;
            }, function(response) {
                alert("Error Retrieving Note Types");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/noteType/note-type.selection.html',

    };
}]);
