angular.module('SelectionBoxes').directive('schoolReportStatusSelection', ['SchoolReportStatus', function(SchoolReportStatus) {
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
        controller: ['SchoolReportStatus', function(SchoolReportStatus) {
            var vm = this;
            vm.schoolReportStatus = [];

            SchoolReportStatus.query().then(function(response) {
                vm.schoolReportStatus = response.data;
            }, function(response) {
                alert("Error Retrieving  School Report Status");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/schoolReportStatus/school-report-status.selection.html',

    };
}]);
