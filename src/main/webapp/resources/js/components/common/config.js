(function() {

    angular
        .module('cid.app.config', [])
        .factory('$cidConfig', CIDConfigFactory);

    function CIDConfigFactory() {
        return {
            datepickerOptions: {
                datepickerMode: 'day',
                formatDay: 'dd',
                formatMonth: 'MM',
                formatYear: 'yyyy',
                startingDay: 1
            }
        };
    }
})();
