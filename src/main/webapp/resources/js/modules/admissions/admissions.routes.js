/**
 * This file defines the route configuration for the admissions section of the CID system.
 *
 */
(function() {
    'use strict';

    angular.module('cid.admissions').config(admissionsRoutesConfiguration);

    admissionsRoutesConfiguration.$inject = ['$stateProvider'];

    function admissionsRoutesConfiguration($stateProvider) {
        $stateProvider
            .state('admissions', {
                parent: 'site',
                url: '/admissions',
                data: {
                    roles: ['ROLE_Admissions']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/admissions/views/welcome.html',
                    },
                    "admissions@": {},
                },
            })
            .state('admissions.new', {
                url: '/new',
                data: {
                    roles: ['ROLE_Admissions']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/admissions/views/application-form-new.html',
                    },
                },
            })
            .state('admissions.search', {
                url: '/search',
                data: {
                    roles: ['ROLE_Admissions']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/admissions/views/search.html',
                        controller: 'ApplicationSearchController',
                        controllerAs: 'ctrl'
                    },
                },
            })
            .state('admissions.edit', {
                url: '/edit/{studentId}',
                data: {
                    roles: ['ROLE_Admissions']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/admissions/views/application-form-edit.html',
                    },
                },
                resolve: {
                    application: ['$stateParams', 'ApplicationForm', function($stateParams, ApplicationForm) {
                        return ApplicationForm.get($stateParams.studentId);
                    }]
                }
            })

        ;



    }

})();
