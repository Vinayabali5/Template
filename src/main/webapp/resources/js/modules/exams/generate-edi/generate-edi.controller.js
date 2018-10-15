/**
 * The ExamSyllabusViewer module for viewing Syllabus basedata for an individual examBoard
 */
(function() {
    angular
        .module('cid.exams.generate-edi')
        .controller('GenerateEdiFileViewerController', GenerateEdiFileViewerController);

    GenerateEdiFileViewerController.$inject = ['examSeriesList', '$scope', '$http', '$uibModal', '$mdDialog', 'ExamSeries', 'EdiDataGenerator'];

    function GenerateEdiFileViewerController(examSeriesList, $scope, $http, $uibModal, $mdDialog, ExamSeries, EdiDataGenerator) {
        var vm = this;

        console.log('GenerateEdiFileViewer Controller Loaded');
        vm.examSeriesList = examSeriesList.data;
        vm.generatedMessage = [];
        vm.generateEdiFiles = generateEdiFiles;
        vm.changeSelected = changeSelected;

        /*************************************************************************/
        /**	Callback function to be called from examSeriesCheckBox directive	**/
        /*************************************************************************/
        function changeSelected(examSeriesListIndex, selected) {
            vm.examSeriesList[examSeriesListIndex].selected = selected;
        }

        /*****************************************************/
        /**	Generate edi files for all selected examSeries	**/
        /*****************************************************/
        function generateEdiFiles(ev) {
            vm.generatedMessage = [];
            for (i = 0; i < vm.examSeriesList.length; i++) {
                if (vm.examSeriesList[i].selected) {
                    var callbackSuccess = processGenerateEdiFileResponse(vm.examSeriesList[i]);
                    var callbackFailure = processGenerateEdiFileError(vm.examSeriesList[i]);
                    EdiDataGenerator.generateEDIFile(
                        vm.examSeriesList[i].examYear,
                        vm.examSeriesList[i].examSeries,
                        vm.examSeriesList[i].examBoard.id).then(callbackSuccess, callbackFailure);
                }
            }
            $mdDialog.show({
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    generatedMessage: vm.generatedMessage
                },
                controller: ['$scope', 'generatedMessage', function($scope, generatedMessage) {
                    $scope.generatedMessage = generatedMessage;
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                }],
                templateUrl: 'js/modules/exams/generate-edi/views/generate-edi-dialog.html',
            });
        }

        function processGenerateEdiFileResponse(examSeries) {
            return function(data) {
                vm.generatedMessage.push(examSeries.examBoard.description + ", " + examSeries.examSeries + " EDI file generated.");
            };
        }

        function processGenerateEdiFileError(examSeries) {
            return function(data) {
                console.log(examSeries);
                vm.generatedMessage.push("ERROR occurred generating EDI file for " + examSeries.examBoard.description + ", " + examSeries.examSeries);
            };
        }
    }

})();
