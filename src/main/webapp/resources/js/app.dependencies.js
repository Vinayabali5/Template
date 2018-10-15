/**
 * The module definition for the MainApp for the cis-template application. This includes all the dependencies that are required by the system.
 *
 * Applied Styles: [Y001, Y002, Y010, Y020, Y021, Y023]
 */
(function() {
    angular
        .module('cid', [
            'ui.router',
            //            'ngResource',
            //            'ngStorage',
            //    'ngCookies',
            'ngMaterial',
            'ui.bootstrap',
            'ui.timepicker',

            // Dependencies
            'cid.app.constants',
            'cid.app.variables',
            'cid.app.config',
            'cid.app.environment',
            'cid.user-settings',
            'cid.data',
            'ContactsTableDirective',
            'cid.search',
            'Lookups',
            'SelectionBoxes',
            'Filters',



            // Core Services
            'ErrorHandler',
            'cid.core.authentication',

            // Main Modules
            'cid.site',
            'cid.tests',

            'cid.exams',

            'cid.admissions',
            'cid.student-record',
            'cid.course-record-viewer',
            'StudentEmailer',

            // General Directives
            'ReportLinkDirective',
            'CurrentYearSelectorDirective',

            // Read-Only Directive Definitions
            'AddressDetailsDirective',
            'ContactsTableDirective',
            'CourseSearchDirective',
            'CoursesTableDirective',
            'CourseGroupsTableDirective',
            'EnrolmentsTableDirective',
            'StudentEntryQualificationsTableDirective',
            'PersonContactDetailsDirective',
            'PersonContactDetailsLookupDirective',
            'PersonDetailsDirective',
            'PersonDetailsLookupDirective',
            'StudentSummaryDirective',
            'StudentImageDirective',
            'StudentDetailsDirective',
            'StudentDetailsLookupDirective',
            'RegistersTableDirective',
            'CorrespondencesTableDirective',
            'ILPInterviewsTableDirective',
            'StudentWarningDetailsDirective',
            'StudentSpecialCategoryDetailsDirective',
            'StudentYearDetailsDirective',
            'StudentTimetableDirective',
            'ExternalResultsArchiveTableDirective',
            'StudentInterimReportsTableDirective',
            'StudentLearningSupportDetailsDirective',
            'CollegeFundPaymentDetailsDirective',
            'WordGeneratorDirective',
            'StudentOverallAttendanceDetailsDirective',
            'StudentAdmissionsDetailsDirective',
            'MedicalNotesDetailsDirective',
            'TutorGroupRemarkPermissionTableDirective',
            'ExamResultsTableDirective',
            'OptionEntriesDirective',
            'WarningCodeChangeDetailsDirective',
            'NoteTableDirective',
            'EnrolmentsTableDirective',
            'TimetableTableDirective',

            // Editor Directives
            'AddressEditorDirective',
            'AcademicYearsEditorDirective',
            'ApplicationStatusesEditorDirective',
            'ContactsEditorDirective',
            'EnrolmentManagerDirective', // This is the dynamic checker version
            'EnrolmentsEditorDirective', // This is the table editing version (not is working order)
            'StudentEntryQualificationsEditorDirective',
            'RegistersEditorDirective',
            'StudentSpecialCategoryEditorDirective',
            'PersonEditorDirective',
            'StudentWarningEditorDirective',
            'StudentBursaryEditorDirective',
            'StudentWithdrawalDirective',
            'StudentYearEditorDirective',
            'CourseDetailsDirective',
            'CollegeFundPaymentEditorDirective',
            'StudentSummaryEditorDirective',
            'StudentContactPreferencesEditorDirective',
            'MedicalNotesEditorDirective',
            'ExamResultsEditorDirective',
            'RoomsEditorDirective',
            'BlocksEditorDirective',
            'PeriodsEditorDirective',
            'TutorGroupsEditorDirective',
            'FacultiesEditorDirective',
            'DepartmentsEditorDirective',
            'SubjectsEditorDirective',
            'LevelsEditorDirective',
            'YearGroupsEditorDirective',
            'SchoolsEditorDirective',
            'AdmissionsDirective',
            'SettingsEditorDirective',
            'TextLookupEditorDirective',
            'LetterTemplateEditorDirective',
            'PossibleGradesEditorDirective',
            'PossibleGradeSetsEditorDirective',
            'StaffsEditorDirective',
            'SpecialCategoriesEditorDirective',
            'HolidaysEditorDirective',
            'AttendanceMonitoringsEditorDirective',
            'CentralMonitoringsEditorDirective',
            'PunctualityMonitoringsEditorDirective',
            'ReferralReasonsEditorDirective',
            'ConcessionTypesEditorDirective',
            'SupportTypesEditorDirective',
            'OfferTypesEditorDirective',
            'EntryQualificationTypesEditorDirective',
            'ReportingPeriodsEditorDirective',
            'EntryQualificationsEditorDirective',
            'StudentLearningSupportCostsEditorDirective',
            'StudentLearningSupportVisitsEditorDirective',
            'StudentLearningSupportEditorDirective',
            'RolesEditorDirective',
            'PersonNotesEditorDirective',
            'StudentUciEditorDirective'

        ]);

})();
