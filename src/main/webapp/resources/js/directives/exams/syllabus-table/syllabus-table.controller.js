(function() {
    angular
        .module('SyllabusTableDirective')
        .controller('SyllabusTableDirectiveController', syllabusTableController);

    syllabusTableController.$inject = ['$rootScope', '$scope', '$http', '$uibModal', '$filter', 'Syllabus', 'APP'];

    function syllabusTableController($rootScope, $scope, $http, $uibModal, $filter, Syllabus, APP) {
        console.log('SyllabusTableDirectiveController loaded');
        var vm = this;

        vm.getSyllabusNonPageable = getSyllabusNonPageable;
        vm.getSyllabusPage = getSyllabusPage;
        vm.init = init;
        vm.loadSyllabi = loadSyllabi;
        vm.pageChanged = pageChanged;
        vm.paginationInfo = {
            pageNumber: 1, // Current page number for pagination
            pageSize: undefined, // Number of items to display on page - undefined means not paginated
            startItem: undefined, // Start item for pagination - undefined means not paginated
            sort: 'code',
            order: ['-examSeries.examYear', '+examSeries.examSeries', '+code'],
            maxSize: 5 // Number of page options to show on pagination bar
        };
        vm.search = search;
        vm.setCurrentExamBoard = setCurrentExamBoard;
        vm.setSort = setSort;
        vm.viewDetails = viewDetails;

        ///////////////////////////////////////////////////////////////////////////////////////////

        init();

        /*****************************************************************/
        /**	Non-pageable version used when a syllabus code is passed	**/
        /*****************************************************************/
        function getSyllabusNonPageable() {
            console.log('Loading non pageable');

            //	CHANGE THIS TO CALL A NON-PAGEABLE VERSION, which will potentially load syllabi where the option matches.

            vm.syllabusList = [];
            var syllabi = $scope.syllabusCode.split(",");
            syllabi.forEach(function(s) {
                Syllabus.query({
                        examBoardId: $scope.curExamBoard,
                        syllabusCode: s.trim(),
                        examYear: $scope.examYear,
                        examSeries: $scope.examSeries
                    })
                    .then(function(data, status, header) {
                        for (i = 0; i < data.data.length; i++) {
                            vm.syllabusList.push(data.data[i]);
                        }
                        //						$scope.syllabusList.push(data[0]);
                        //						var returnedHeaders = header();
                        //						$scope.paginationInfo.totalItems = returnedHeaders["x-total-items"];
                        //						$scope.paginationInfo.totalPages = returnedHeaders["x-total-pages"];
                    });
            });
        }

        /*************************************************************************/
        /**	Client side pagination version used when NO syllabus code is passed	**/
        /*************************************************************************/
        function getSyllabusPage() {
            console.log('Loading (client side pagination)');
            var yearId = APP.getYear().id;

            Syllabus.query({
                    examBoardId: $scope.curExamBoard,
                    //				syllabusCode: $scope.syllabusCode,			// <--  DO NOT PASS IN PAGEABLE VERSION
                    yearId: yearId,
                    examYear: $scope.examYear, // {
                    examSeries: $scope.examSeries, // { <-- NEED TO BRING YEAR AND POSSIBLY SERIES INTO SITE 
                    //                    page: vm.paginationInfo.pageNumber - 1,
                    //                    size: vm.paginationInfo.pageSize,
                    //                    sort: vm.paginationInfo.sort + ',' + vm.paginationInfo.order
                })
                .then(function(data /*, status, headers*/ ) {
                    /* angular 1.5 way of retrieving data and headers is no longer valid in angular 1.6
                    //					$scope.syllabusList = data;
                    //					var returnedHeaders = headers();
                    //					$scope.paginationInfo.totalItems = returnedHeaders["x-total-items"];
                    //					$scope.paginationInfo.totalPages = returnedHeaders["x-total-pages"];
                    */
                    vm.syllabusList = data.data;
                    vm.paginationInfo.totalItems = data.headers("x-total-items");
                    vm.paginationInfo.totalPages = data.headers("x-total-pages");
                });
        }

        /**
         * function init
         */
        function init() {
            vm.curExamBoard = $scope.$parent.curExamBoard;
            vm.syllabus = $scope.syllabus;
            vm.syllabusList = [];
            vm.searchTerm = '';
            vm.orderReverse = false;
            //            vm.filterParams = $scope.filterParams;
            vm.pageable = ($scope.syllabusCode === undefined);
            vm.expandable = ($scope.expandable === null || $scope.expandable === undefined || $scope.expandable);
            if (vm.pageable) {
                vm.paginationInfo.pageSize = 10;
                vm.paginationInfo.startItem = 0;
            }
            loadSyllabi();
        }

        /**
         * function loadSyllabi
         */
        function loadSyllabi() {
            if (vm.pageable) {
                getSyllabusPage();
            } else {
                getSyllabusNonPageable();
            }
        }

        /**
         * function pageChanged
         */
        function pageChanged() {
            console.log('Page changed to: ' + vm.paginationInfo.pageNumber);
            vm.paginationInfo.startItem = (vm.paginationInfo.pageNumber - 1) * vm.paginationInfo.pageSize;

            //            getSyllabusPage();
        }

        /**
         * function search
         */
        function search() {
            console.log('$scope.search');
            var search = vm.searchTerm;
            var url = this.url;
            if (search.size > 3) {
                var appList = this.applicationList;
                $http.get(url).then(function(response) {
                    $scope.syllabusList = response;
                });
            }
        }

        /**
         * function setCurrentExamBoard
         */
        function setCurrentExamBoard(newExamBoard) {
            vm.curExamBoard = newExamBoard;
        }

        /**
         * function setSort
         */
        function setSort(column) {
            if (vm.paginationInfo.sort != column) {
                vm.paginationInfo.sort = column;
                vm.paginationInfo.order = ['+' + vm.paginationInfo.sort];
                vm.orderReverse = false;
            } else {
                vm.orderReverse = !vm.orderReverse;
                if (vm.orderReverse) {
                    vm.paginationInfo.order = ['-' + vm.paginationInfo.sort];
                } else {
                    vm.paginationInfo.order = ['+' + vm.paginationInfo.sort];
                }
            }
            //            vm.syllabusList = 
            //            getSyllabusPage();
        }

        /**
         * function viewDetails
         */
        function viewDetails(headerCode, headerTitle, details) {
            console.log('$scope.viewDetails');
            var detailsViewer = $uibModal.open({
                templateUrl: 'js/modules/entities/genericViewer/genericViewer.html',
                controller: 'GenericViewerController',
                resolve: {
                    headerVal: function() {
                        return headerCode + " - " + headerTitle;
                    },
                    dataSet: function() {
                        return details;
                    }
                }
            });
        }

        $scope.$on('$destroy', $rootScope.$on('exam-syllabus-saved', loadSyllabi));

        $rootScope.$on("current-year-changed", loadSyllabi);
    }
})();
