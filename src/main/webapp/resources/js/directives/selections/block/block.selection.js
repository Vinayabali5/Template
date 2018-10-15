angular.module('SelectionBoxes').directive('blockSelection', ['Block', function(Block) {
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
        controller: ['Block', function(Block) {
            var vm = this;
            vm.blocks = [];
            Block.query().then(function(response) {
                vm.blocks = response.data;
            }, function(response) {
                alert("Error Retrieving Blocks");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/block/block.selection.html',
    };
}]);
