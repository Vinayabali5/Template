/**
 * This is the main module definition for the site.
 *
 *  Applied Styles: [Y001, Y002, Y010, Y021]
 *
 * @type Module
 */
(function() {
    'use strict';

    angular
        .module('cid.exams.exam-series')
        .controller('ExamSeriesController', examSeriesController);

    examSeriesController.$inject = ['examSeriesList', '$log', '$scope', '$rootScope', '$uibModal', 'ExamSeries'];

    function examSeriesController(examSeriesList, $log, $scope, $rootScope, $uibModal, ExamSeries) {
        /*jshint validthis: true */
        var vm = this;

        vm.addExamSeries = addExamSeries;
        vm.editExamSeries = editExamSeries;
        vm.examSeriesList = examSeriesList.data;
        vm.getIndex = getIndex;
        vm.initRow = initRow;

        // All the event listeners are destroyed once the functions are called.
        $scope.$on('$destroy', $rootScope.$on('exam-series-saved', function(data) {
            loadExamSeries();
        }));

        $rootScope.$on("current-year-changed", function(data) {
            loadExamSeries();
        });

        function addExamSeries() {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/modules/exams/exam-series/views/exam-series-editorDialog.html',
                controller: 'ExamSeriesEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    examSeriesEntity: function() {
                        var examSeries = {};
                        return examSeries;
                    }
                }
            });
        }

        /*
         * The following 3 functions are designed to store and retrieve the examSeriesId directly as an attribute to/from the DOM element.
         * This appears to be an unfortunate necessity as I have been unable to find an AngularJS way of linking the exmSeriesId from within
         * the exam-series-table directives ng-repeat to the appropriate edit button which is positioned as a transclude.
         */

        function editExamSeries($event) {
            // Retrieve the examSeriesId from the button DOM element.
            var examSeriesId;
            if ($event.target.attributes.examseriesid) {
                examSeriesId = $event.target.attributes.examseriesid.value;
            } else {
                examSeriesId = $event.currentTarget.attributes.examseriesid.value;
            }
            var modalInstance = $uibModal.open({
                templateUrl: 'js/modules/exams/exam-series/views/exam-series-editorDialog.html',
                controller: 'ExamSeriesEditorDialogController',
                controllerAs: 'ctrl',
                resolve: {
                    examSeriesEntity: function(ExamSeries) {
                        return ExamSeries.get(examSeriesId).then(function(response) {
                            return response.data;
                        }, function(response) {
                            alert("Failed to retrieve exam series");
                        });
                    }
                }
            });
        }

        function getIndex(examSeriesId) {
            // Callback function gets the value of the examSeriesId back from the exam-series-table directive.
            // We need to know this so we can make sure pressing the edit button loads details of the correct exam series.
            vm.examSeriesId = examSeriesId;
        }

        function initRow(examSeriesId) {
            // Set the exam series ID as an attribute on to the button DOM element.
            // This HAS to be examseriesid without hyphens so it can be accessed from $event.
            document.getElementById("edit-button").setAttribute("examseriesid", examSeriesId);
            // Tweak the id of the button DOM element to edit-button-xx so that there is only ever one element with id edit-button.
            document.getElementById("edit-button").setAttribute("id", "edit-button-" + examSeriesId);
        }

        function loadExamSeries() {
            ExamSeries.query().then(function(response) {
                vm.examSeriesList = response.data;
                $log.info("Loading ExamSeries");
            }, function(response) {
                $log.error("Failed to load ExamSeries");
            });
        }

    }
}());
