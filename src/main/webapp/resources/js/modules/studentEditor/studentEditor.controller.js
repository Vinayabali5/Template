/**
 * This file defines the student records module for the CID system.
 */
(function() {
    'use strict';

    angular
        .module('cid.student-record')
        .controller('StudentEditorSearchController', StudentEditorSearchController)
        .controller('StudentEditorController', StudentEditorController);

    StudentEditorSearchController.$inject = ['$state'];
    StudentEditorController.$inject = ['$log', '$scope', '$rootScope', '$state', '$stateParams', 'studentEntity', 'Student', 'Person', 'Address', 'Contact', 'StudentWarning', 'StudentEntryQualification', 'StudentBursary', 'MasterRegister', 'StudentCollegeFundPaid', 'LearningSupportCost', 'LearningSupportVisit', 'GLOBAL', 'APP'];

    function StudentEditorSearchController($state) {
        /* jshint validthis:true */
        var vm = this;

        vm.loadStudent = function(id) {
            $state.go('student-editor.edit', {
                studentId: id
            });
        };

    }

    function StudentEditorController($log, $scope, $rootScope, $state, $stateParams, studentEntity, Student, Person, Address, Contact, StudentWarning, StudentEntryQualification, StudentBursary, MasterRegister, StudentCollegeFundPaid, LearningSupportCost, LearningSupportVisit, GLOBAL, APP) {
        /* jshint validthis:true */
        var vm = this;

        // Controller Properties and Variables
        vm.loaded = false;
        vm.student = studentEntity ? studentEntity.data : {};
        vm.studentAddress = {};
        vm.studentPerson = {};
        vm.studentYear = {};
        vm.studentAdmissions = {};
        vm.contacts = [];
        vm.contact = {};
        vm.enrolments = [];
        vm.studentBursary = {};
        vm.specialCategories = [];
        vm.studentEntryQualifications = [];
        vm.externalResultsArchive = [];
        vm.registers = [];
        vm.studentOverallAttendance = {};
        vm.ilpInterviews = [];
        vm.learningSupport = {};
        vm.collegeFundPayments = [];
        vm.interimReports = [];
        vm.examResults = [];
        vm.studentAlternativeUcis = [];
        vm.studentOptionEntries = [];
        vm.studentCollegeFundPaid = [];
        vm.identificationViolations = [];
        vm.studentLearningSupportCosts = [];
        vm.studentLearningSupportVisits = [];
        vm.warningCodeChanges = [];

        vm.ilpFilter = {};

        vm.currentYear = APP.getYear();

        // Controller Methods
        vm.loadStudent = loadStudent;

        vm.loadStudentYear = loadStudentYear;
        vm.loadContacts = loadContacts;
        vm.loadEnrolments = loadEnrolments;
        vm.loadSpecialCategories = loadSpecialCategories;
        vm.loadRegister = loadRegister;
        vm.loadStudentEntryQualifications = loadStudentEntryQualifications;
        vm.loadBursary = loadBursary;
        vm.loadAdmissions = loadAdmissions;
        vm.loadWarnings = loadWarnings;
        vm.loadOverallAttendance = loadOverallAttendance;
        vm.loadIlpInterviews = loadIlpInterviews;
        vm.loadExternalResultsArchive = loadExternalResultsArchive;
        vm.loadLearningSupport = loadLearningSupport;
        vm.loadCollegeFundPayments = loadCollegeFundPayments;
        vm.loadInterimReports = loadInterimReports;
        vm.loadExamResults = loadExamResults;
        vm.loadAlternativeUcis = loadAlternativeUcis;
        vm.loadOptionEntries = loadOptionEntries;
        vm.loadStudentCollegeFundPaid = loadStudentCollegeFundPaid;
        vm.loadIdentificationViolations = loadIdentificationViolations;
        vm.loadStudentLearningSupportCosts = vm.loadStudentLearningSupportCosts;
        vm.loadStudentLearningSupportVisits = vm.loadStudentLearningSupportVisits;
        vm.loadWarningCodeChanges = vm.loadWarningCodeChanges;

        vm.clear = clear;
        vm.init = init;

        init();

        // Private Interface

        function getAppYear() {
            return APP.getYear();
        }

        $rootScope.$watch(getAppYear, function() {
            vm.currentYear = APP.getYear();
        });

        // Controller Methods
        function init() {
            $log.log('StudentRecordsController::init called');
            if ($stateParams.studentId) {
                loadStudent($stateParams.studentId);
            }
            // Register Event Listners
            $scope.$on('$destroy', $rootScope.$on('student-withdrawn', function(data) {
                vm.loadStudent(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on('enrolments-saved', function(data) {
                vm.loadEnrolments(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on('enrolments-updated', function(data) {
                vm.loadEnrolments(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on('register-saved', function(data) {
                vm.loadRegister(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on("exam-results-saved", function(data) {
                vm.loadExamResults(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on("current-year-changed", function(data) {
                loadStudentYear(vm.student.id, APP.getYear().id);
                loadEnrolments(vm.student.id);
                loadInterimReports(vm.student.id);
                loadRegister(vm.student.id);
                loadOptionEntries(vm.student.id);
                loadOverallAttendance(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on("option-entires-updated", function(data) {
                vm.loadOptionEntries(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on("fund-paid-updated", function(data) {
                vm.loadStudentCollegeFundPaid(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on("student-admission-updated", function(data) {
                vm.loadAdmissions(vm.student.id);
            }));
            $scope.$on('$destroy', $rootScope.$on("identification-violation-saved", function(data) {
                vm.loadIdentificationViolations(vm.student.id);
            }));

            if ($stateParams.tab !== undefined && $stateParams.tab !== null) {
                $scope.activeTab = $stateParams.tab;
            }
        }

        function clear() {
            vm.loaded = false;
            vm.student = [];
            vm.studentAddress = {};
            vm.studentPerson = {};
            vm.studentYear = {};
            vm.contacts = [];
            vm.contact = {};
            vm.enrolments = [];
            vm.studentBursary = {};
            vm.specialCategories = [];
            vm.studentAdmissions = {};
            vm.studentEntryQualifications = [];
            vm.externalResultsArchive = [];
            vm.registers = [];
            vm.studentOverallAttendance = {};
            vm.ilpInterviews = [];
            vm.learningSupport = {};
            vm.collegeFundPayments = [];
            vm.interimReports = [];
            vm.examResults = [];
            vm.studentAlternativeUcis = [];
            vm.studentOptionEntries = [];
            vm.identificationViolations = [];
            vm.studentLearningSupportCosts = [];
            vm.studentLearningSupportVisits = [];
            vm.warningCodeChnages = [];
        }

        function loadStudent(id) {
            $log.log('StudentRecordsController::loadStudent called');
            Student.get(id).then(function(response) {
                $log.log('II Student with ID: ' + id + ' retireved.');
                vm.student = response.data;
                if (response.data) {
                    vm.loaded = true;
                    $rootScope.$emit('student.loaded');
                }
                var personId = vm.student.person.id;
                var addressId = vm.student.person.addressId;

                if (addressId) {
                    Address.get(addressId).then(function(response) {
                        vm.studentAddress = response.data;
                        $rootScope.$emit('student.address.loaded');
                    });
                }
                if (personId) {
                    Person.get(personId).then(function(response) {
                        vm.studentPerson = response.data;
                        $rootScope.$emit('student.person.loaded');
                    });
                }
                if (personId) {
                    loadContacts(personId);
                }

            }, function(response) {
                $log.log('EE An error occurred trying to retireve the student with ID: ' + id);
                alert("Failed to retrieve student with ID: " + id);
            });

            loadStudentYear(id, APP.getYear().id);
            loadBursary(id);
            loadAdmissions(id);
            loadEnrolments(id);
            loadStudentEntryQualifications(id);
            loadExternalResultsArchive(id);
            loadWarnings(id);
            loadSpecialCategories(id);
            loadRegister(id);
            loadOverallAttendance(id);
            loadIlpInterviews(id);
            loadLearningSupport(id);
            loadCollegeFundPayments(id);
            loadInterimReports(id);
            loadExamResults(id);
            loadAlternativeUcis(id);
            loadOptionEntries(id);
            loadStudentCollegeFundPaid(id);
            loadIdentificationViolations(id);
            loadStudentLearningSupportCosts(id);
            loadStudentLearningSupportVisits(id);
            loadWarningCodeChanges(id);
        }

        function loadContacts(personId) {
            vm.contacts = [];
            Person.contacts(personId).then(function(response) {
                vm.contacts = response.data;
                $rootScope.$emit('student.contacts.loaded');
            }, function(response, status) {
                $log.error("EE Failed to load perons' contacts for person: " + personId);
            });
        }

        function loadStudentYear(id, yearId) {
            vm.studentYear = {};
            Student.studentYears(id, yearId).then(function(response) {
                vm.studentYear = response.data;
                $rootScope.$emit('student.year.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's year information for student: " + id);
            });
        }

        function loadAdmissions(id) {
            vm.studentAdmissions = {};
            Student.admissions(id).then(function(response) {
                vm.studentAdmissions = response.data;
                $rootScope.$emit('student.admissions.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's admissions information for studnet: " + id);
            });
        }


        function loadBursary(id) {
            vm.studentBursary = {};
            Student.bursary(id).then(function(response) {
                vm.studentBursary = response.data;
                $rootScope.$emit('student.bursary.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's bursary information for studnet: " + id);
            });
        }

        function loadEnrolments(id, year) {
            vm.enrolments = [];
            Student.enrolments(id, year).then(function(response) {
                vm.enrolments = response.data;
                $rootScope.$emit('student.enrolments.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's enrolments for student: " + id);
            });
        }

        function loadStudentEntryQualifications(id) {
            vm.studentEntryQualifications = [];
            StudentEntryQualification.get(id).then(function(response) {
                vm.studentEntryQualifications = response.data;
                $rootScope.$emit('student.entryQualifications.loaded');
            }, function(response, status) {
                $log.error("EE Failed to load entryQualifications' entryQualifications: " + id);
            });
        }

        function loadWarnings(id) {
            vm.warnings = {};
            Student.warnings(id).then(function(response) {
                vm.warnings = response.data;
                $rootScope.$emit('student-warnings-loaded');
            }, function(response) {
                $rootScope.$emit('student-warnings-load-failed');
                $log.error("EE Failed to load the student's warnings for student: " + id);
            });
        }

        function loadSpecialCategories(id) {
            vm.specialCategories = [];
            Student.specialCategories(id).then(function(response) {
                vm.specialCategories = response.data;
                $rootScope.$emit('student-special-categories-loaded');
            }, function(response) {
                $rootScope.$emit('student-special-categories-load-failed');
                $log.error("EE Failed to load the student's warnings for student: " + id);
            });
        }

        function loadRegister(id) {
            vm.registers = [];
            MasterRegister.get(id).then(function(response) {
                vm.registers = response.data;
                $rootScope.$emit('student.registers.loaded');
            }, function(response, status) {
                $log.error("EE Failed to load registers' registers: " + id);
                vm.registers = [];
            });
        }

        function loadOverallAttendance(id) {
            vm.studentOverallAttendance = {};
            Student.attendance(id).then(function(response) {
                Student.idViolations(id).then(function(response) {
                    vm.identificationViolations = response.data;
                }, function(response) {
                    $log.error("Failed to load student id violations " + id);
                });

                vm.studentOverallAttendance = response.data;
                $rootScope.$emit('student.overall-attendance.loaded');
            }, function(response, status) {
                $log.error("EE Failed to load registers' registers: " + id);
            });
        }

        function loadIlpInterviews(id) {
            vm.ilpInterviews = [];
            Student.ilpInterviews(id).then(function(response) {
                vm.ilpInterviews = response.data;
                $rootScope.$emit('student.ilp-interviews.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's ILP interviews for student: " + id);
                vm.ilpInterviews = [];
            });
        }

        function loadExternalResultsArchive(id) {
            vm.externalResultsArchive = [];
            Student.externalResultsArchive(id).then(function(response) {
                vm.externalResultsArchive = response.data;
                $rootScope.$emit('student.external-results-archive.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's external results archive for student: " + id);
            });
        }

        function loadLearningSupport(id) {
            vm.learningSupport = {};
            Student.learningSupport(id).then(function(response) {
                vm.learningSupport = response.data;
                $rootScope.$emit('student.learning-support.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's learning support data for student: " + id);
            });
        }

        function loadCollegeFundPayments(id) {
            vm.collegeFundPayments = [];
            Student.collegeFundPayments(id).then(function(response) {
                vm.collegeFundPayments = response.data;
                $rootScope.$emit('student.college-fund-payments.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's college fund payments for student: " + id);
            });
        }

        function loadInterimReports(id) {
            vm.interimReports = [];
            Student.interimReports(id).then(function(response) {
                vm.interimReports = response.data;
                $rootScope.$emit('student.interim-reports.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student interim reports for student: " + id);
            });
        }

        function loadExamResults(id) {
            vm.examResults = [];
            Student.results(id).then(function(response) {
                vm.examResults = response.data;
                $rootScope.$emit('student.exam-results.loaded');
            }, function(response) {
                $log.error("EE Failed to load the student's exam results for student: " + id);
            });
        }

        function loadAlternativeUcis(id) {
            Student.studentAlternativeUci(id).then(function(response) {
                vm.studentAlternativeUcis = response.data;
                $rootScope.$emit('student.alternative-ucis.loaded');
            }, function(response) {
                $log.error("Failed to load the student's alternative Ucis for student: " + id);
            });
        }

        function loadOptionEntries(id) {
            Student.optionEntries(id).then(function(response) {
                vm.studentOptionEntries = response.data;
            }, function(response) {
                $log.error("Failed to load student option entries" + id);
            });
        }

        function loadStudentCollegeFundPaid(id) {
            StudentCollegeFundPaid.get(id).then(function(response) {
                vm.studentCollegeFundPaid = response.data;
            }, function(response) {
                $log.error("Failed to load student college fund paid" + id);
            });
        }

        function loadIdentificationViolations(id) {
            vm.identificationViolations = [];
            Student.idViolations(id).then(function(response) {
                vm.identificationViolations = response.data;
            }, function(response) {
                $log.error("Failed to load student id violations " + id);
            });
        }

        function loadStudentLearningSupportCosts(id) {
            vm.studentLearningSupportCosts = [];
            LearningSupportCost.getByStudent(id).then(function(response) {
                vm.studentLearningSupportCosts = response.data;
                $rootScope.$emit('student.learningSupportCosts.loaded');
            }, function(response, status) {
                $log.error("EE Failed to load learningSupportCosts' learningSupportCosts: " + id);
            });
        }

        function loadStudentLearningSupportVisits(id) {
            vm.studentLearningSupportVisits = [];
            LearningSupportVisit.getByStudent(id).then(function(response) {
                vm.studentLearningSupportVisits = response.data;
                $rootScope.$emit('student.learningSupportVisits.loaded');
            }, function(response, status) {
                $log.error("EE Failed to load learningSupportVisits' learningSupportVisits: " + id);
            });
        }

        function loadWarningCodeChanges(id) {
            vm.warningCodeChanges = [];
            StudentWarning.getStudentWarning(id).then(function(response) {
                vm.warningCodeChanges = response.data;
                $rootScope.$emit('student.warningCodeChanges.loaded');
            }, function(response, status) {
                $log.error("EE Failed to load warningCodeChanges' warningCodeChanges: " + id);
            });
        }

    }

})();
