angular.module('SelectionBoxes').directive('supportTypeSelection', ['SupportType', function(SupportType) {
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
        controller: ['SupportType', function(SupportType) {
            var vm = this;
            vm.supportTypes = [];

            SupportType.query().then(function(response) {
                vm.supportTypes = response.data;
            }, function(response) {
                alert("Error Retrieving SupportTypes");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/supportType/support-type.selection.html',
    };
}]);
