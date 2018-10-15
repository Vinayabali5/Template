(function() {
    'use strict';

    angular
        .module('cid.data')
        .config(dataRouteConfiguration);

    dataRouteConfiguration.$inject = ['$stateProvider'];

    function dataRouteConfiguration($stateProvider) {
        $stateProvider
            .state('data', {
                abstract: true,
                parent: 'site',
                url: '/data',
            })
            .state('data.reporting-periods', {
                url: '/reporting-periods',
                data: {
                    roles: ['ROLE_Core Data']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/data/views/reporting-periods.html',
                        controller: 'DataController',
                        controllerAs: 'ctrl'
                    },
                },
                resolve: {
                    dataCollection: ['ReportingPeriod', function(ReportingPeriod) {
                        return ReportingPeriod.getByYear();
                    }]
                }

            })

        ;
    }
})();
