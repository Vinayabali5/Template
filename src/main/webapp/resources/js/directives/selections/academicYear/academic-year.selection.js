(function() {

    angular
        .module('SelectionBoxes')
        .directive('academicYearSelection', AcademicYearSelectionDirective);

    AcademicYearSelectionDirective.$inject = ['AcademicYear'];

    function AcademicYearSelectionDirective(AcademicYear) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                class: '@',
                readonly: '=?',
                ngmodelvar: '=ngModel'

            },
            link: function(scope, element, attrs, controller) {
                element[0].removeAttribute('id');
                element[0].removeAttribute('class');
                element[0].removeAttribute('readonly');
                element[0].disable = scope.readonly;

            },
            controller: ['AcademicYear', function(AcademicYear) {
                var vm = this;

                this.academicYears = [];

                this.init = function() {
                    AcademicYear.query().then(function(response) {
                        vm.academicYears = response.data;
                    }, function(err) {
                        alert("Error Retrieving AcademicYears");
                    });
                };

                this.init();
            }],
            controllerAs: 'ctrl',
            templateUrl: 'js/directives/selections/academicYear/academic-year.selection.html',
        };
    }

})();
