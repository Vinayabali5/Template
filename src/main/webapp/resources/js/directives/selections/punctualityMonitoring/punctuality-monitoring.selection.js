angular.module('SelectionBoxes').directive('punctualityMonitoringSelection', ['PunctualityMonitoring', function(PunctualityMonitoring) {
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
        controller: ['PunctualityMonitoring', function(PunctualityMonitoring) {
            var vm = this;
            vm.punctualityMonitorings = [];
            PunctualityMonitoring.query().then(function(response) {
                vm.punctualityMonitorings = response.data;
            }, function(response) {
                alert("Error Retrieving PunctualityMonitorings");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/punctualityMonitoring/punctuality-monitoring.selection.html',
    };
}]);
