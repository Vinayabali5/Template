(function() {
    angular
        .module('cid.exams.course-exam-details')
        .controller('CourseExamDetailsEditorController', ["$log", "$rootScope", "$scope", "$state", "$uibModalInstance", "entity", "Course",
            function($log, $rootScope, $scope, $state, $uibModalInstance, entity, Course) {
                $log.debug('CourseExamRecordEditorController loaded');

                $scope.init = function() {
                    $scope.currentCourse = entity.data;
                    // Use a local copy of SyllabusCode - this stops the syllabusTable directive from being auto refreshed when typing into the Syllabus Code input box.
                    $scope.syllabusCode = $scope.currentCourse.syllabusCode;

                    $rootScope.courseExamRecordToSave = [];
                    $rootScope.courseExamRecordToSave.courseComponent = [];
                    $rootScope.courseExamRecordToSave.courseOption = [];
                    $rootScope.courseExamRecordToSave.courseSyllabus = [];

                    $rootScope.courseExamRecordSavedCounter = 0;

                    $rootScope.courseExamRecordToDelete = [];
                    $rootScope.courseExamRecordToDelete.courseComponent = [];
                    $rootScope.courseExamRecordToDelete.courseOption = [];
                    $rootScope.courseExamRecordToDelete.courseSyllabus = [];

                    $rootScope.courseExamRecordDeletedCounter = 0;
                };

                function watch(obj, compare, prop, handler, param) {
                    if (obj === compare) {
                        clearInterval(intervalTimer[prop]);
                        handler(param);
                    }
                }

                processElements = function(functionArrayToProcess) {
                    for (i = 0; i < functionArrayToProcess.length; i++) {
                        functionArrayToProcess[i]();
                    }
                };

                $scope.save = function(result) {
                    $log.debug('CourseExamRecordEditorController::save called');

                    Course.save($scope.currentCourse);

                    processElements($rootScope.courseExamRecordToSave.courseSyllabus);
                    processElements($rootScope.courseExamRecordToDelete.courseComponent);
                    processElements($rootScope.courseExamRecordToSave.courseOption);

                    intervalTimer = [];
                    // Watchdog timer to check if ALL courseOptions have been created before courseComponents are created.
                    intervalTimer.save = setInterval(function() {
                        watch($rootScope.courseExamRecordSavedCounter, $rootScope.courseExamRecordToSave.courseOption.length, "save",
                            processElements, $rootScope.courseExamRecordToSave.courseComponent);
                    }, 250);

                    // Watchdog timer to be sure that ALL courseComponents are deleted before any courseOptions.
                    intervalTimer.del = setInterval(function() {
                        watch($rootScope.courseExamRecordDeletedCounter, $rootScope.courseExamRecordToDelete.courseComponent.length, "del",
                            processElements, $rootScope.courseExamRecordToDelete.courseOption);
                    }, 250);

                    processElements($rootScope.courseExamRecordToDelete.courseSyllabus);

                    $uibModalInstance.close();
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.refresh = function() {
                    $log.debug('CourseExamRecordEditorController::refresh called');
                    $scope.syllabusCode = $scope.currentCourse.syllabusCode;
                };

                $scope.init();
            }
        ]);
}());
