(function() {
    angular
        .module('cid')
        .config(configCors)
        .config(configNoCache)

    ;

    configCors.$inject = ['$httpProvider'];
    configNoCache.$inject = ['$httpProvider'];

    /**
     * Setting up the CORS (Cross-Origin Resource Sharing) setting for use with the API
     */
    function configCors($httpProvider) {
        //	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        //    $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

    // Disable XHR request chaching (IE Fix)
    function configNoCache($httpProvider) {
        $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    }




})();
