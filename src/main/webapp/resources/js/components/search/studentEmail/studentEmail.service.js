angular.module('StudentEmailSearchService', []).factory('StudentEmail', function($http, GLOBAL) {
    var url = GLOBAL.API + '/search/studentEmail';

    return {
        query: function() {
            return $http.get(url);
        },
        search: function(searchParams) {
            if (searchParams && searchParams instanceof Object) {
                return $http.get(url, {
                    params: searchParams
                });
            }
        }
    };
});
