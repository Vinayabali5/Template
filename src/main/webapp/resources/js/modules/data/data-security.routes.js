(function() {
    'use strict';

    angular
        .module('cid.data')
        .config(securityDataRouteConfiguration);

    securityDataRouteConfiguration.$inject = ['$stateProvider'];

    function securityDataRouteConfiguration($stateProvider) {
        $stateProvider
            .state('data.security', {
                abstract: true,
                url: '/security',
                data: {
                    roles: ['ROLE_Core Data']
                },
            })
            .state('data.security.staff', {
                url: '/staffs',
                data: {
                    roles: ['ROLE_Core Data']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/data/views/staff.html',
                        controller: 'DataController',
                        controllerAs: 'ctrl'
                    },
                },
                resolve: {
                    dataCollection: ['Staff', function(Staff) {
                        return Staff.query();
                    }]
                }

            })

            .state('data.security.roles', {
                url: '/roles',
                data: {
                    roles: ['ROLE_Core Data']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/data/views/roles.html',
                        controller: 'DataController',
                        controllerAs: 'ctrl'
                    },
                },
                resolve: {
                    dataCollection: ['Role', function(Role) {
                        return Role.query();
                    }]
                }

            });
    }
})();
