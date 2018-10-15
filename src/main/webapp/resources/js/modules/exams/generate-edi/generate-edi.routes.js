(function() {
    angular
        .module('cid.exams.generate-edi')
        .config(generateEdiRouteConfiguration);

    generateEdiRouteConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function generateEdiRouteConfiguration($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('exams.generate-edi', {
                url: '/generate-edi',
                views: {
                    "content@": {
                        templateUrl: 'js/modules/exams/generate-edi/views/generate-edi-form.html',
                        controller: 'GenerateEdiFileViewerController',
                        controllerAs: 'ctrl'
                    },
                },
                resolve: {
                    examSeriesList: ['ExamSeries', function(ExamSeries) {
                        return ExamSeries.query();
                    }]
                }
            });
    }

})();
