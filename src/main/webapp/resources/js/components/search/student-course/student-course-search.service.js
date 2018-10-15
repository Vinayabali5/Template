angular.module('cid.search.student-course', []).factory('StudentCourseSearch', function($http, GLOBAL) {
    var url = GLOBAL.API + '/search/studentCourse';

    return {
        query: function() {
            return $http.get(url);
        },
        search: function(searchParams) {
            if (searchParams && searchParams instanceof Object) {
                var encodedUri = url + '?' + $.param(searchParams);
                return $http.get(encodedUri);
                //return $http.get(url, { params: searchParams });
            }
        }
    };
});
