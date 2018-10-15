angular.module('SelectionBoxes').directive('ediStatusTypeSelection', ['EdiStatusType', function(EdiStatusType) {
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
        controller: ['EdiStatusType', function(EdiStatusType) {
            var vm = this;
            vm.ediStatusTypes = [];

            EdiStatusType.query().then(function(response) {
                vm.ediStatusTypes = response.data;
            }, function(err) {
                alert("Error Retrieving EdiStatusTypes");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/ediStatusType/ediStatusType.selection.html',
    };
}]);
