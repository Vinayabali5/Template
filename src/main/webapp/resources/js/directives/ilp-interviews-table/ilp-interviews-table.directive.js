/**
 * This directive is used to display a table of ILP Interviews
 *
 * Applied Styles:
 *
 * @type Directive
 * @example <ilp-interviews-table ilp-interviews="{ilpInterviewArray}"></ilp-interviews-table>
 */
(function() {
    'use strict';

    angular
        .module('ILPInterviewsTableDirective', [])
        .directive('ilpInterviewsTable', ilpInterviewsTable);

    function ilpInterviewsTable() {
        return {
            restrict: 'E',
            scope: {
                showAll: '=?',
                showStudent: '=?',
                showStaff: '=?',
                showCourse: '=?',
                showCourseGroup: '=?',
                showLip: '=?',
                showLetterHome: '=?',
                showTargets: '=?',
                interviewFilter: '=?filter',
                ilpInterviews: '='
            },
            templateUrl: 'js/directives/ilp-interviews-table/ilp-interviews-table.html',
            controller: ['$scope', function($scope) {
                // Setting default attribute values
                if (angular.isUndefined($scope.showCourse)) {
                    $scope.showCourse = true;
                }
                if (angular.isUndefined($scope.showStaff)) {
                    $scope.showStaff = true;
                }
                if (angular.isUndefined($scope.showLetterHome)) {
                    $scope.showLetterHome = true;
                }
            }]
        };
    }
})();
