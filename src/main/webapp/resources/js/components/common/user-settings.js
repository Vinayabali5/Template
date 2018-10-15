(function() {
    angular
        .module('cid.user-settings', [
            'ngCookies',
            'cid.service.logger',
            'cid.app.constants',
        ])
        .factory('USER', UserSettingsFactory);

    UserSettingsFactory.$inject = ['$cookies', 'Logger', 'GLOBAL'];

    function UserSettingsFactory($cookies, Logger, GLOBAL) {
        var DEBUG = GLOBAL.DEBUG;
        var COOKIE_NAME = 'cid.user-settings';
        var expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        var settings = {
            debugInfoEnabled: false,
            displaySideBar: true
        };
        var options = {
            expires: expiryDate
        };

        // Public Interface

        var service = {
            load: load,
            save: save,
            clear: clear,
            refresh: refresh,
            setSetting: setSetting,
            getSetting: getSetting,
        };

        return service;

        // Private Interface

        function load() {
            Logger.debug('II Loading User Settings');
            var loadedSettings = $cookies.getObject(COOKIE_NAME);
            if (loadedSettings !== undefined) {
                settings = $cookies.getObject(COOKIE_NAME);
            }
            return settings;
        }

        function save() {
            Logger.debug('II Saving User Settings');
            $cookies.putObject(COOKIE_NAME, settings, options);
        }

        function refresh() {
            load();
            save();
        }

        function clear() {
            Logger.debug('II Clearing User Settings');
            settings = {};
            $cookies.remove(COOKIE_NAME);
        }

        function setSetting(key, value) {
            Logger.debug("II Setting '" + key + "' has being set to: " + value);
            if (!settings) settings = {};
            settings[key] = value;
            save();
        }

        function getSetting(key) {
            Logger.debug("II Setting '" + key + "' being retrieved with value: '" + settings[key] + "'");
            return settings[key];
        }

    }

})();
