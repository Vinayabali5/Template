/**
 * This is the Student Special LearningSupport Editor Controller 
 *
 * Applied Styles: [Y001, Y002, Y010, Y022, Y023, Y024, Y031, Y032, Y033, Y034]
 *
 * @type Controller
 */



(function() {
    'use strict';

    angular
        .module('StudentLearningSupportEditorDirective')
        .controller('StudentLearningSupportEditorController', StudentLearningSupportEditorController);

    StudentLearningSupportEditorController.$inject = ['$log', '$scope', '$rootScope', '$uibModal', 'StudentLearningSupport'];

    function StudentLearningSupportEditorController($log, $scope, $rootScope, $uibModal, StudentLearningSupport) {
        /* jshint validthis:true */
        var vm = this;
        vm.dialog = {};
        vm.message = '';

        vm.studentId = vm.studentId ? vm.studentId : undefined;
        vm.studentLearningSupport = vm.studentLearningSupport ? vm.studentLearningSupport : {};
        vm.init = init;
        vm.loadStudentLearningSupport = loadStudentLearningSupport;
        vm.editStudentLearningSupport = editStudentLearningSupport;


        function init() {
            $log.log('StudentLearningSupportDetailsDirectiveController::init called');
            vm.loadStudentLearningSupport(vm.studentId);
        }

        function loadStudentLearningSupport(studentId) {
            StudentLearningSupport.get(studentId).then(function(response) {
                $log.info('II StudentLearningSupport Loaded');
                vm.studentLearningSupport = response.data;
            });
        }

        //update the StudentLearningSupport information
        function editStudentLearningSupport(studentId) {
            $log.log('StudentLearningSupportDetailsDirectiveController::editContact called');
            //var studentLearningSupportId = id;
            var modalInstance = $uibModal.open({
                templateUrl: 'js/directives/student-learning-support-editor/views/student-learning-support-editor-dialog.html',
                controller: 'StudentLearningSupportEditorDialogController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    studentLearningSupportEntity: function(StudentLearningSupport) {
                        return StudentLearningSupport.get(studentId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("failed to retrieve");
                        });
                    }
                }
            });
            modalInstance.result.then().finally(function() {
                vm.loadStudentLearningSupport(vm.studentId);
            });
        }

        $scope.hasData = function() {
            if ($scope.studentLearningSupport && $scope.studentLearningSupport !== undefined) {
                return true;
            } else {
                return false;
            }
        };
    }

})();
