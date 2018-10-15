/**
 * This is the PersonNotes Editor Controller
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */

(function() {
    'use strict';

    angular
        .module('PersonNotesEditorDirective')
        .controller('PersonNotesEditorController', PersonNotesEditorController);

    PersonNotesEditorController.$inject = ['$log', '$uibModal', '$scope', 'Note'];

    function PersonNotesEditorController($log, $uibModal, $scope, Note) {
        /* jshint validthis:true */
        var vm = this;
        vm.notes = [];

        vm.loadPersonNotes = loadPersonNotes;
        vm.editPersonNotes = editPersonNotes;
        vm.addPersonNotes = addPersonNotes;

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

        function loadPersonNotes() {
            Note.query().then(function(response) {
                vm.notes = response.data;
                $log.info("Loading PersonNotes ");
            }, function(response) {
                $log.error("Failed to load PersonNotes");
            });
        }

        function editPersonNotes(personNoteId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/person-notes-editor/views/person-notes-editorDialog.html',
                controller: 'PersonNotesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    personNotesEntity: function(Note) {
                        return Note.get(noteId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadPersonNotes();
            });

        }

        function addPersonNotes() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/person-notes-editor/views/person-notes-editorDialog.html',
                controller: 'PersonNotesEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    personNoteEntity: function() {
                        var notes = {
                            personId: $scope.personId
                        };
                        return notes;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadPersonNotes();
            });

        }
    }

})();
