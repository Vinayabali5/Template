(function() {
    angular
        .module('cid.exams')
        .config(RouteConfiguration);

    RouteConfiguration.$inject = ['$stateProvider'];

    function RouteConfiguration($stateProvider) {
        var examsRootState = {
            name: 'exams',
            parent: 'site',
            url: '/exams',
            abstract: true,
            data: {
                roles: ['ROLE_Exams Officer']
            },
            views: {
                "content@": {
                    template: '<h1>Exams System</h1>'
                }
            }
        };
        $stateProvider.state(examsRootState);
    }
}());
