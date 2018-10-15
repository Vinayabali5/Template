(function() {
    angular
        .module('cid.exams.exam-series')
        .config(examSeriesRouteConfiguration);

    examSeriesRouteConfiguration.$inject = ['$stateProvider'];

    function examSeriesRouteConfiguration($stateProvider) {
        $stateProvider
            .state('data.exam-series', {
                url: '/exam-series',
                data: {
                    roles: ['ROLE_Exams Officer']
                },
                views: {
                    "content@": {
                        templateUrl: 'js/modules/exams/exam-series/views/exam-series.html',
                        controller: 'ExamSeriesController',
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
