/**
 * This is the main module definition for the site.
 *
 *  Applied Styles: [Y001, Y002, Y010, Y021]
 *
 * @type Module
 */
(function() {
    'use strict';

    angular
        .module('cid.data')
        .controller('DataController', DataController);

    DataController.$inject = ['dataCollection', '$scope', '$rootScope', 'Block', 'Room', 'Period', 'TutorGroup', 'Faculty', 'Department', 'Subject', 'Level', 'YearGroup', 'School', 'Settings', 'LetterTemplate', 'PossibleGrade', 'PossibleGradeSet', 'TextLookup', 'AcademicYear', 'SpecialCategory', 'Holiday', 'AttendanceMonitoring', 'CentralMonitoring', 'PunctualityMonitoring', 'ReferralReason', 'ConcessionType', 'SupportType', 'OfferType', 'EntryQualificationType', 'ReportingPeriod', 'EntryQualification', 'ApplicationStatus', 'Staff', 'Role'];

    function DataController(dataCollection, $scope, $rootScope, Block, Room, Period, TutorGroup, Faculty, Department, Subject, Level, YearGroup, School, Settings, LetterTemplate, PossibleGrade, PossibleGradeSet, TextLookup, AcademicYear, SpecialCategory, Holiday, AttendanceMonitoring, CentralMonitoring, PunctualityMonitoring, ReferralReason, ConcessionType, SupportType, OfferType, EntryQualificationType, ReportingPeriod, EntryQualification, ApplicationStatus, Staff, Role) {
        var vm = this;
        vm.data = dataCollection.data;

        // All the event listeners are destroyed once the functions are called.
        $scope.$on('$destroy', $rootScope.$on('blocks-saved', function(data) {
            loadBlock();
        }));

        $scope.$on('$destroy', $rootScope.$on('letter-template-updated', function(data) {
            loadLetterTemplates();
        }));

        $scope.$on('$destroy', $rootScope.$on('room-saved', function(data) {
            loadRoles();
        }));

        $scope.$on('$destroy', $rootScope.$on('role-saved', function(data) {
            loadRooms();
        }));

        $scope.$on('$destroy', $rootScope.$on('periods-saved', function(data) {
            loadPeriods();
        }));

        $scope.$on('$destroy', $rootScope.$on('tutor-groups-saved', function(data) {
            loadTutorGroups();
        }));

        $scope.$on('$destroy', $rootScope.$on('faculties-saved', function(data) {
            loadFaculity();
        }));

        $scope.$on('$destroy', $rootScope.$on('departments-saved', function(data) {
            loadDepartments();
        }));

        $scope.$on('$destroy', $rootScope.$on('subjects-saved', function(data) {
            loadSubjects();
        }));

        $scope.$on('$destroy', $rootScope.$on('levels-saved', function(data) {
            loadLevels();
        }));

        $scope.$on('$destroy', $rootScope.$on('staffs-saved', function(data) {
            loadStaffs();
        }));

        $scope.$on('$destroy', $rootScope.$on('yearGroups-saved', function(data) {
            loadYearGroups();
        }));

        $scope.$on('$destroy', $rootScope.$on('schools-saved', function(data) {
            loadSchools();
        }));

        $scope.$on("destory", $rootScope.$on('settings-saved', function(data) {
            loadSettings();
        }));

        $scope.$on('$destroy', $rootScope.$on('possible-grades-saved', function(data) {
            loadPossibleGrades();
        }));

        $scope.$on('$destroy', $rootScope.$on('possible-grade-sets-saved', function(data) {
            loadPossibleGradeSets();
        }));

        $scope.$on('$destroy', $rootScope.$on('text-lookup-saved', function(data) {
            loadTextLookup();
        }));

        $scope.$on('$destroy', $rootScope.$on('academic-year-saved', function(data) {
            loadAcademicYear();
        }));

        $scope.$on('$destroy', $rootScope.$on('special-category-saved', function(data) {
            loadSpecialCatogories();
        }));

        $scope.$on('$destroy', $rootScope.$on('holidays-saved', function(data) {
            loadHolidays();
        }));

        $scope.$on('$destroy', $rootScope.$on('attendance-monitorings-saved', function(data) {
            loadAttendanceMonitorings();
        }));

        $scope.$on('$destroy', $rootScope.$on('central-monitorings-saved', function(data) {
            loadCentralMonitorings();
        }));

        $scope.$on('$destroy', $rootScope.$on('punctuality-monitorings-saved', function(data) {
            loadPunctualityMonitorings();
        }));

        $scope.$on('$destroy', $rootScope.$on('referralReasons-saved', function(data) {
            loadReferralReasons();
        }));

        $scope.$on('$destroy', $rootScope.$on('concessionTypes-saved', function(data) {
            loadConcessionTypes();
        }));

        $scope.$on('$destroy', $rootScope.$on('supportTypes-saved', function(data) {
            loadSupportTypes();
        }));

        $scope.$on('$destroy', $rootScope.$on('offerTypes-saved', function(data) {
            loadOfferTypes();
        }));

        $scope.$on('$destroy', $rootScope.$on('entryQualificationTypes-saved', function(data) {
            loadEntryQualificationTypes();
        }));
        $scope.$on('$destroy', $rootScope.$on('entryQualifications-saved', function(data) {
            loadEntryQualifications();
        }));
        $scope.$on('$destroy', $rootScope.$on('reportingPeriods-saved', function(data) {
            loadReportingPeriods();
        }));
        $scope.$on('$destroy', $rootScope.$on('application-statuses-saved', function(data) {
            loadApplicationStatuses();
        }));

        function loadAcademicYear() {
            AcademicYear.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading AcademicYear");
            }, function(response) {
                $log.error("Failed to load AcademicYears");
            });
        }

        function loadApplicationStatuses() {
            ApplicationStatus.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading ApplicationStatuses");
            }, function(response) {
                $log.error("Failed to load ApplicationStatuses");
            });
        }

        function loadBlock() {
            Block.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading Blocks");
            }, function(response) {
                $log.error("Failed to load Blocks");
            });
        }


        function loadRooms() {
            Room.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading Rooms");
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadRoles() {
            Role.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading Roles");
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadPeriods() {
            Period.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading Periods");
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadTutorGroups() {
            TutorGroup.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadFaculity() {
            Faculty.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadDepartments() {
            Department.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }


        function loadSubjects() {
            Subject.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadLevels() {
            Level.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadStaffs() {
            Staff.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadYearGroups() {
            YearGroup.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadSchools() {
            School.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadSettings() {
            Settings.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load");
            });
        }

        function loadLetterTemplates() {
            LetterTemplate.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load");
            });
        }

        function loadPossibleGrades() {
            PossibleGrade.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading PossibleGrades");
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadTextLookup() {
            TextLookup.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadPossibleGradeSets() {
            PossibleGradeSet.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading PossibleGradeSets");
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadSpecialCatogories() {
            SpecialCategory.query().then(function(response) {
                vm.data = response.data;
                $log.info("Loading SpecialCategories");
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadHolidays() {
            Holiday.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadAttendanceMonitorings() {
            AttendanceMonitoring.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadCentralMonitorings() {
            CentralMonitoring.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadPunctualityMonitorings() {
            PunctualityMonitoring.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadReferralReasons() {
            ReferralReason.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadConcessionTypes() {
            ConcessionType.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadSupportTypes() {
            SupportType.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadOfferTypes() {
            OfferType.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadEntryQualificationTypes() {
            EntryQualificationType.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadEntryQualifications() {
            EntryQualification.query().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }

        function loadReportingPeriods() {
            ReportingPeriod.getByYear().then(function(response) {
                vm.data = response.data;
            }, function(response) {
                $log.error("Failed to load ");
            });
        }


    }
}());
