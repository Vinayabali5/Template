(function() {
    'use strict';

    angular
        .module('cid.site')
        .config(mainSiteRouteConfiguration);

    mainSiteRouteConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function mainSiteRouteConfiguration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('site', {
                data: {
                    roles: ['ROLE_Staff']
                },
                views: {
                    "navigation@": {
                        templateUrl: 'js/modules/site/views/navigation.html',
                        controller: 'MainSiteNavigationController',
                        controllerAs: 'ctrl',
                    },
                    "side-bar-global@": {
                        templateUrl: 'js/modules/site/views/side-bar-global.html',
                        controller: 'MainSiteNavigationController',
                        controllerAs: 'ctrl'
                    },
                    "debug@": {
                        templateUrl: 'js/modules/site/views/debug-info.html',
                        controller: 'MainSiteDebugController',
                        controllerAs: 'ctrl',
                    },
                },
            })
            .state('site.home', {
                url: '/',
                data: {
                    roles: ['ROLE_Staff']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/site/views/home.html',
                        controller: 'MainSiteNavigationController',
                        controllerAs: 'ctrl'
                    },
                },
            })
            .state('site.reports', {
                url: '/reports',
                data: {
                    roles: ['ROLE_Staff']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/site/views/reports.html',
                        controller: 'MainSiteNavigationController',
                        controllerAs: 'ctrl'
                    },
                },
            })
            .state('login', {
                url: '/login',
                views: {
                    "content@": {
                        templateUrl: 'js/modules/site/views/login.html',
                        controller: 'MainSiteLoginController',
                        controllerAs: 'ctrl',
                    }
                }
            });
    }
})();
