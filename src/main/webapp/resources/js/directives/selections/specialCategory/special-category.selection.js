angular.module('SelectionBoxes').directive('specialCategorySelection', ['SpecialCategory', function(SpecialCategory) {
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
        controller: ['SpecialCategory', function(SpecialCategory) {
            var vm = this;
            vm.specialCategories = [];

            SpecialCategory.query().then(function(response) {
                vm.specialCategories = response.data;
            }, function(err) {
                alert("Error Retrieving special categories");
            });
        }],
        controllerAs: 'ctrl',
        templateUrl: 'js/directives/selections/specialCategory/special-category.selection.html',

    };
}]);
