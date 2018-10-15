/**
 * This is the definition of the application's configuraiton and initial launch.
 */
(function() {

    angular
        .module('cid')
        .run(initialiseApplication)
        .run(initialiseAuthentication)
        .run(debugConfiguration);

    initialiseApplication.$inject = ['$rootScope', '$location', '$state', '$stateParams', 'Auth', 'AcademicYear', 'Logger', 'GLOBAL', 'APP', 'USER'];
    initialiseAuthentication.$inject = ['$state', '$transitions', 'Auth', 'Logger', 'GLOBAL'];
    debugConfiguration.$inject = ['$transitions', 'Logger', 'APP'];

    function initialiseApplication($rootScope, $location, $state, $stateParams, Auth, AcademicYear, Logger, GLOBAL, APP, USER) {
        function getAcademicYear() {
            AcademicYear.getCurrent().then(function(response) {
                APP.setYear(response.data);
            }, function(response) {
                Logger.log('EE Cannot retrieve the defaults current year.');
            });
        }

        var DEBUG = GLOBAL.DEBUG;

        Logger.info('II TemplateApplication - run');
        $rootScope.GLOBAL = GLOBAL;

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        USER.refresh();

        if ($rootScope.globals === undefined) {
            $rootScope.globals = {};
        }
        $rootScope.globals.sideBar = USER.getSetting('displaySideBar');

        Auth.getUser();
        Auth.refreshUser();

        $rootScope.$watch(APP.getYear(), function(newValue, oldValue) {
            Logger.log(oldValue);
            Logger.log(newValue);
        });

        getAcademicYear();
    }

    // Set up Authentication and Authorization
    function initialiseAuthentication($state, $transitions, Auth, Logger, GLOBAL) {
        Logger.info('II - Initialising the Authentication and Authorisation component');
        $transitions.onStart({}, function(trans) {
            var targetState = trans.$to();
            var isStateLogin = $state.is('login') || targetState.name === 'login';
            var isAuthenticated = Auth.isAuthenticated();
            if (!isStateLogin && !isAuthenticated) {
                return trans.router.stateService.target('login');
            }
            var roles = targetState.data !== undefined ? targetState.data.roles : undefined;
            var isAuthorised = Auth.isAuthorised(roles);

            if (!isStateLogin && !isAuthorised) {
                Logger.debug('II Authorisation Failed');
                return trans.router.stateService.target('accessdenied');
            }
            return true;
        });

    }

    // Set up the debug information
    function debugConfiguration($transitions, Logger, APP) {
        $transitions.onStart({}, function(trans) {
            var fromState = trans.$from();
            var toState = trans.$to();
            APP.setCurrentState(toState.name);
            APP.setCurrentStateParams(toState.params);
            APP.setPreviousState(fromState.name);
            APP.setPreviousStateParams(fromState.params);
        });
    }

})();
