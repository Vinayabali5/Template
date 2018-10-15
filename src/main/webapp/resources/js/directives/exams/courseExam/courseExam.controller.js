(function() {
    angular
        .module('CourseExamDirective')
        .controller('CourseExamDirectiveController', ["$rootScope", "$scope", "$http", "$uibModal", "CourseSyllabus", "CourseOption", "CourseComponent",
            function($rootScope, $scope, $http, $uibModal, CourseSyllabus, CourseOption, CourseComponent) {
                var vm = this;
                $scope.courseExamCheckBox = false;
                $scope.dataLevel = 0;
                console.log('CourseExamDirectiveController loaded');

                /**
                 * Save courseComponent data to the database
                 */
                $rootScope.courseExamRecordToSave.courseComponent.push(function(data) {
                    if ($scope.dataLevel == 1 && $scope.courseExamCheckBox) {
                        // save CourseComponent record
                        courseComponent = {
                            component: {},
                            courseOption: {}
                        };
                        courseComponent.examComponentId = $scope.component.id;
                        courseComponent.courseOption.courseId = $scope.course.id;
                        courseComponent.courseOption.examOptionId = $scope.option.examOptionId;
                        CourseComponent.create(courseComponent);
                    }
                });

                /**
                 * Save courseOption data to the database
                 */
                $rootScope.courseExamRecordToSave.courseOption.push(function(data) {
                    if ($scope.dataLevel == 2 && $scope.courseExamCheckBox) {
                        // save CourseOption record
                        courseOption = {};
                        courseOption.courseId = $scope.course.id;
                        courseOption.examOptionId = $scope.option.examOptionId;
                        CourseOption.create(courseOption).finally(function() {
                            $rootScope.courseExamRecordSavedCounter++;
                        });
                    } else {
                        $rootScope.courseExamRecordSavedCounter++;
                    }
                });

                /**
                 * Save courseSyllabus data to the database
                 */
                $rootScope.courseExamRecordToSave.courseSyllabus.push(function(data) {
                    if ($scope.dataLevel == 3 && $scope.courseExamCheckBox) {
                        // save CourseSyllabus record
                        courseSyllabus = {};
                        courseSyllabus.courseId = $scope.course.id;
                        courseSyllabus.syllabusId = $scope.syllabus.id;
                        CourseSyllabus.create(courseSyllabus);
                    }
                });

                /**
                 * Remove courseComponent link record from the database
                 */
                $rootScope.courseExamRecordToDelete.courseComponent.push(function(data) {
                    if ($scope.dataLevel == 1 && !$scope.courseExamCheckBox) {
                        // delete CourseComponent record
                        CourseComponent.delete($scope.course.id, $scope.option.examOptionId, $scope.component.id).finally(function() {
                            $rootScope.courseExamRecordDeletedCounter++;
                        });
                    } else {
                        $rootScope.courseExamRecordDeletedCounter++;
                    }
                });

                /**
                 * Remove courseOption link record from the database
                 */
                $rootScope.courseExamRecordToDelete.courseOption.push(function(data) {
                    if ($scope.dataLevel == 2 && !$scope.courseExamCheckBox) {
                        // delete CourseOption record
                        CourseOption.delete($scope.course.id, $scope.option.examOptionId);
                    }
                });

                /**
                 * Remove courseSyllabus link record from the database
                 */
                $rootScope.courseExamRecordToDelete.courseSyllabus.push(function(data) {
                    if ($scope.dataLevel == 3 && !$scope.courseExamCheckBox) {
                        // delete CourseSyllabus record
                        CourseSyllabus.delete($scope.course.id, $scope.syllabus.id);
                    }
                });

                /**
                 * listener function to determine whether to check/uncheck checkbox
                 */
                var courseExamCheckboxChangedTearDown = $rootScope.$on('course-exam-checkbox-changed', function(data, level, checkBoxVal, syllabusId, examOptionId) {
                    // 3 - Syllabus    ->    Option    ->    Component - 1
                    // Higher level unchecked, then uncheck lower level check boxes
                    if (level > $scope.dataLevel && !checkBoxVal) {
                        if ((examOptionId && $scope.option !== undefined && $scope.option.examOptionId == examOptionId) ||
                            ($scope.dataLevel == 3 && syllabusId == $scope.syllabus.id)) {
                            $scope.courseExamCheckBox = false;
                        }
                    }

                    // Lower checked, then check higher level check boxes
                    if (level < $scope.dataLevel && checkBoxVal) {
                        if ((examOptionId && $scope.option !== undefined && $scope.option.examOptionId == examOptionId) ||
                            ($scope.dataLevel == 3 && syllabusId == $scope.syllabus.id)) {
                            $scope.courseExamCheckBox = true;
                        }
                    }
                });

                /**
                 * listener function to remove all listener functions from the root scope listener
                 */
                var courseExamTearDownTearDown = $rootScope.$on('course-exam-tear-down', function() {
                    courseExamCheckboxChangedTearDown(); // Remove listener functions when saving or cancelling from window.
                    courseExamTearDownTearDown();
                });

                /**
                 * checkBoxChanged - The a function to broadcast a checkBoxChanged message to all directives
                 */
                $scope.checkBoxChanged = function() {
                    if ($scope.option === undefined) {
                        $rootScope.$emit('course-exam-checkbox-changed', $scope.dataLevel, $scope.courseExamCheckBox, $scope.syllabus.id, 0);
                    } else {
                        $rootScope.$emit('course-exam-checkbox-changed', $scope.dataLevel, $scope.courseExamCheckBox, $scope.syllabus.id, $scope.option.examOptionId);
                    }
                };

                /**
                 * Scan through scope parents to locate the related data for this checkbox
                 */
                $scope.locateData = function(callback) {
                    $scope.curParent = $scope.$parent;
                    while ($scope.curParent.$parent !== null) {
                        if (callback($scope.curParent) !== undefined) {
                            return callback($scope.curParent);
                        } else {
                            $scope.curParent = $scope.curParent.$parent;
                        }
                    }
                };

                /**
                 * Initialise the data for this checkbox
                 */
                $scope.init = function() {
                    // Locate course data (if it exists)
                    $scope.course = $scope.locateData(function(data) {
                        return data.currentCourse;
                    });

                    // Locate syllabus data (if it exists)
                    $scope.syllabus = $scope.locateData(function(data) {
                        return data.syllabus;
                    });

                    // Locate option data (if it exists)
                    $scope.option = $scope.locateData(function(data) {
                        return data.option;
                    });

                    // Locate component data (if it exists)
                    $scope.component = $scope.locateData(function(data) {
                        return data.component;
                    });

                    if ($scope.course && $scope.course.id && $scope.option && $scope.option.examOptionId) {
                        if ($scope.component && $scope.component.id) {
                            // This is Exam Component check box (lowest)
                            $scope.dataLevel = 1;
                            CourseComponent.get($scope.course.id, $scope.option.examOptionId, $scope.component.id).then(function(response) {
                                $scope.courseExamCheckBox = (response.status == 200 &&
                                    response.data.courseOption.courseId == $scope.course.id &&
                                    response.data.courseOption.examOptionId == $scope.option.examOptionId &&
                                    response.data.examComponentId == $scope.component.id);
                            });
                        } else {
                            // This is Exam Option check box
                            $scope.dataLevel = 2;
                            CourseOption.get($scope.course.id, $scope.option.examOptionId).then(function(response) {
                                $scope.courseExamCheckBox = (response.status == 200 &&
                                    response.data.courseId == $scope.course.id &&
                                    response.data.examOptionId == $scope.option.examOptionId);
                            });
                        }
                    } else {
                        if ($scope.course && $scope.course.id && $scope.syllabus && $scope.syllabus.id) {
                            // This is Exam Syllabus level (highest)
                            $scope.dataLevel = 3;
                            CourseSyllabus.get($scope.course.id, $scope.syllabus.id).then(function(response) {
                                $scope.courseExamCheckBox = (response.status == 200 &&
                                    response.data.courseId == $scope.course.id &&
                                    response.data.syllabusId == $scope.syllabus.id);
                            });
                        }
                    }

                };

                $scope.init();
            }
        ]);
}());
