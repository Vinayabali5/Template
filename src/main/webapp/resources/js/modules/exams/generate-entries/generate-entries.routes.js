(function() {
    angular.module('cid.exams.generate-entries').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('exams.generate-entries', {
                url: '/generate-entries',
                views: {
                    "content@": {
                        templateUrl: 'js/modules/exams/generate-entries/views/student-option-entries-creation.html'
                    },
                },
            });

    }]);
})();
