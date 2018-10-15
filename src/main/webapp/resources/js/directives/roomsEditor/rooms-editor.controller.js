/**
 * This is the Rooms Editor Controller
 * 
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 * 
 * @type Controller
 */

(function() {
    'use strict';
    angular
        .module('RoomsEditorDirective')
        .controller('RoomsEditorController', RoomsEditorController);

    RoomsEditorController.$inject = ['$log', '$scope', '$state', '$rootScope', '$uibModal', 'Room'];

    function RoomsEditorController($log, $scope, $state, $rootScope, $uibModal, Room) {
        /* jshint validthis:true */
        var vm = this;

        vm.rooms = [];
        vm.room = {};
        vm.searchText = '';
        vm.visible = false;

        vm.loadRooms = loadRooms;
        vm.editRooms = editRooms;
        vm.addRooms = addRooms;

        vm.applyFilter = applyFilter;
        vm.toggleVisibility = toggleVisibility;
        vm.resetFilters = resetFilters;

        function toggleVisibility() {
            vm.visible = !vm.visible;
        }

        // Apply filters
        $scope.filter = {
            code: '',
            description: ''
        };

        function applyFilter() {
            vm.filterParams = {
                code: $scope.filter.code,
                description: $scope.filter.description
            };
        }

        function resetFilters() {

            vm.filterParams = {
                code: '',
                description: ''
            };

            $scope.filter = {
                code: '',
                description: ''
            };
        }

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



        function loadRooms() {
            Room.query().then(function(response) {
                vm.rooms = response.data;
                $log.info("Loading Exam Results");
            }, function(response) {
                $log.error("Failed to load Results");
            });
        }


        function editRooms(roomId) {
            $log.log("RoomEditorController :: editRooms called");
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/roomsEditor/views/rooms-editorDialog.html',
                controller: 'RoomsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    roomEntity: function(Room) {
                        return Room.get(roomId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadRooms();
            });

        }


        function addRooms() {
            $log.log("RoomEditorController :: addRooms called");
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/roomsEditor/views/rooms-editorDialog.html',
                controller: 'RoomsEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    roomEntity: function() {
                        var rooms = {};
                        return rooms;
                    }
                }
            });

            modalInstance.result.then().finally(function() {
                vm.loadRooms();
            });

        }


    }

})();
