(function() {
    angular.module('cid.exams.import-base-data').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('exams.import-base-data', {
                url: '/importBaseData',
                data: {
                    roles: ['ROLE_Exams Officer']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/exams/import-base-data/views/import-base-data-form.html',
                        controller: 'ExamImportBaseDataController',
                        controllerAs: 'eibdc'
                    },
                },
            });

    }]);
})();
