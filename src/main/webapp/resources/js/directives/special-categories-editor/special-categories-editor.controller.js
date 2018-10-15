/**
 * This is the SpecialCategories Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('SpecialCategoriesEditorDirective')
        .controller('SpecialCategoriesEditorController', SpecialCategoriesEditorController);

    SpecialCategoriesEditorController.$inject = ['$log', '$uibModal', '$scope', 'SpecialCategory'];

    function SpecialCategoriesEditorController($log, $uibModal, $scope, SpecialCategory) {
        /* jshint validthis:true */
        var vm = this;
        vm.specialCategories = [];

        vm.loadSpecialCategories = loadSpecialCategories;
        vm.editSpecialCategories = editSpecialCategories;
        vm.addSpecialCategories = addSpecialCategories;

        vm.changeSort = changeSort;
        vm.isSortedAsc = isSortedAsc;
        vm.isSortedDesc = isSortedDesc;

        vm.sortOrder = '+code';

        function changeSort(field) {
            if (vm.sortOrder == '+' + field) {
                vm.sortOrder = '-' + field;
            } else {
                vm.sortOrder = '+' + field;
            }
        }

        function isSortedAsc(fieldName) {
            if (vm.sortOrder == "+" + fieldName) {
                return true;
            }
            return false;
            // check if sortOrder is an array and if it contains fieldName
        }

        function isSortedDesc(fieldName) {
            if (vm.sortOrder == "-" + fieldName) {
                return true;
            }
            return false;
            // check if sortOrder is an array and if it contains fieldName
        }


        function loadSpecialCategories() {
            SpecialCategory.query().then(function(response) {
                vm.specialCategories = response.data;
                $log.info("Loading SpecialCategories ");
            }, function(response) {
                $log.error("Failed to load SpecialCategories");
            });
        }


        function editSpecialCategories(specialCategoryId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/special-categories-editor/views/special-categories-editorDialog.html',
                controller: 'SpecialCategoriesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    specialCategoriesEntity: function(SpecialCategory) {
                        return SpecialCategory.get(specialCategoryId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadSpecialCategories();
            });

        }


        function addSpecialCategories() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/special-categories-editor/views/special-categories-editorDialog.html',
                controller: 'SpecialCategoriesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    specialCategoriesEntity: function() {
                        var specialCategories = {};
                        return specialCategories;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadSpecialCategories();
            });

        }
    }

})();
