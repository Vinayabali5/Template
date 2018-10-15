/**
 *
 */
(function() {
    angular
        .module('cid.exams.import-base-data')
        .controller('ExamImportBaseDataController', function($scope, $http, $uibModal, Syllabus, Option, Component, OptionComponent, ExamBoard, ExamSeries) {
            console.log('ExamImportBaseDataController loaded');
            var vm = this;

            $("#files").change(function(evt) {
                $scope.processImport(evt);
            });
            //		};

            $scope.processImport = function(evt) {
                //		function processImport(evt) {
                var processed = []; // Global variable being watched for changes within
                // callback
                // functions.
                processed.s = false; // s - syllabus - flag to indicate when syllabus
                // file
                // processing has been completed.
                processed.o = false; // o - option - flag to indicate when option file
                // processing has been completed.
                processed.c = false; // c - component - flag to indicate when component
                // file
                // processing has been completed.

                var examSeriesId = 0; // Global variable being watched for change;
                var intervalTimer = {}; // Global variable for setInterval
                var progressStepNo = 0; // Global variable containing the current progress
                // step
                filesChange(evt);
                return;

                function filesChange(evt) {
                    var files = evt.target.files;
                    examSeriesId = 0;
                    intervalTimer = {};
                    progressStepNo = 0;
                    document.getElementById("progress_messages").innerHTML = "";
                    updateProgressMessage("Loading files");

                    if (window.File && window.FileReader && window.FileList && window.Blob) {
                        var exists = [];
                        exists.s = -1; // use -1 as a false indicator, or 0..n as a
                        // valid indicator of array element
                        exists.c = -1;
                        exists.l = -1;
                        exists.o = -1;

                        for (var i = 0, f; f = files[i]; i++) { // jshint ignore:line
                            if (files[i].name.substr(8, 2).toLowerCase() == ".x") {
                                if (exists[files[i].name.substr(0, 1).toLowerCase()] >= 0) {
                                    // error - maybe trying to load multiples? so set flag
                                    // to false and
                                    exists[files[i].name.substr(0, 1).toLowerCase()] = -1;
                                } else {
                                    exists[files[i].name.substr(0, 1).toLowerCase()] = i;
                                }
                            }
                        }


                        if (exists.s >= 0 && exists.c >= 0 && exists.l >= 0 && exists.o >= 0) {
                            var jsonData = {};
                            jsonData.examBoard = {
                                "boardIdentifier": files[exists.s].name.substr(6, 2)
                            };
                            jsonData.examYear = "20" + files[exists.s].name.substr(3, 2);
                            jsonData.examSeries = files[exists.s].name.substr(1, 2).toUpperCase();
                            switch (files[exists.s].name.substr(1, 1).toUpperCase()) {
                                case "9":
                                case "A":
                                case "B":
                                    jsonData.academicYearId = files[exists.s].name.substr(3, 2);

                                    break;
                                default:
                                    jsonData.academicYearId = (Number(files[exists.s].name.substr(3, 2)) - 1);
                            }
                            ExamSeries.create(JSON.stringify(jsonData))
                                .then(function(response) {
                                    examSeriesId = response.id;
                                    if (!examSeriesId) {
                                        alert("Error creating exam Series");
                                        return;
                                    }

                                    readFileContents(files[exists.s]);
                                    intervalTimer.s = setInterval(function() {
                                        watch(processed, "s", readFileContents, files[exists.o]);
                                    }, 250);
                                    intervalTimer.o = setInterval(function() {
                                        watch(processed, "o", readFileContents, files[exists.c]);
                                    }, 250);
                                    intervalTimer.c = setInterval(function() {
                                        watch(processed, "c", readFileContents, files[exists.l]);
                                    }, 250);
                                });
                        } else {
                            alert("Not all necessary files selected or multiple data sets selected.");
                        }
                    } else {
                        alert("The file API's are not fully supported by this browser");
                    }
                }

                function abortRead() {
                    reader.abort();
                }

                function errorHandler(evt) {
                    switch (evt.target.error.code) {
                        case evt.target.error.NOT_FOUND_ERR:
                            alert("File Not Found!");
                            break;
                        case evt.target.error.NOT_READABLE_ERR:
                            alert("File is not readable");
                            break;
                        case evt.target.error.ABORT_ERR:
                            break;
                        default:
                            alert("An error occurred reading this file.");
                    }
                }

                function updateProgressBar(loaded, total) {
                    var percentLoaded = Math.round((loaded / total) * 100);
                    if (percentLoaded <= 100) {
                        progress_bar.style.width = percentLoaded + "%";
                        progress_bar.textContent = percentLoaded + "%";
                    }
                }

                function updateProgress(evt) {
                    if (evt.lengthComputable) {
                        updateProgressBar(evt.loaded, evt.total);
                    }
                }

                function readFileContents(file) {
                    updateOverallProgress("Reading file " + file.name);
                    progress_bar.style.width = "0%";
                    progress_bar.textContent = "0%";

                    var reader = new FileReader();
                    reader.onerror = errorHandler;
                    reader.onprogress = updateProgress;
                    reader.onabort = function(e) {
                        alert("File read cancelled");
                    };
                    reader.onloadstart = function(e) {
                        // document.getElementById("progress_bar").className = "loading";
                    };
                    reader.onload = function(e) {
                        progress_bar.style.width = "100%";
                        progress_bar.textContent = "100%";

                        var contents = e.target.result;
                        switch (file.name.substr(0, 1).toLowerCase()) {
                            case "s":
                                processSyllabus(contents);
                                break;
                            case "o":
                                processOptions(contents);
                                break;
                            case "c":
                                processComponents(contents);
                                break;
                            case "l":
                                processLinks(contents);
                                break;
                        }
                    };
                    reader.readAsText(file);
                }

                function processSyllabus(contents) {
                    var syllabusArray = contents.split("\n");
                    if (!syllabusArray[syllabusArray.length - 1] || 0 === syllabusArray[syllabusArray.length - 1].length) {
                        //Check if the last line is blank, and remove it if it is.
                        //This resolves the discrepancy between exam boards terminating (or not) the final line with CR LF
                        syllabusArray.splice(syllabusArray.length - 1, 1);
                    }

                    var totalRecords = Number(syllabusArray[syllabusArray.length - 2]
                        .substring(7, 14) - 2);
                    var processedCount = 0;

                    updateOverallProgress("Processing Syllabi - " + totalRecords + " records.");
                    updateProgressBar(processedCount, totalRecords);

                    for (var i = 2; i < syllabusArray.length - 2; i++) { // skip first
                        // two and last
                        // two records.
                        var jsonData = {};
                        jsonData.examSeries = {
                            "examSeriesId": examSeriesId
                        };
                        jsonData.code = syllabusArray[i].substring(2, 8).trim();
                        jsonData.title = syllabusArray[i].substring(9, 45).trim();

                        Syllabus.create(JSON.stringify(jsonData))
                            .then(function(response) { // jshint ignore:line
                                processedCount++;
                                updateProgressBar(processedCount, totalRecords);
                                if (processedCount == totalRecords) {
                                    processed.s = true;
                                }
                                if (response.error !== undefined && response.error.status == 400) {
                                    updateProgressMessage(response.error.exception + ":  " + response.error.message);
                                }
                            }); // jshint ignore:line
                    }
                }

                function processOptions(contents) {
                    var optionArray = contents.split("\n");
                    if (!optionArray[optionArray.length - 1] || 0 === optionArray[optionArray.length - 1].length) {
                        //Check if the last line is blank, and remove it if it is.
                        //This resolves the discrepancy between exam boards terminating (or not) the final line with CR LF
                        optionArray.splice(optionArray.length - 1, 1);
                    }

                    var totalRecords = Number(optionArray[optionArray.length - 2].substring(7, 14) - 2);
                    var processedCount = 0;

                    updateOverallProgress("Processing Options - " + totalRecords + " records.");
                    updateProgressBar(processedCount, totalRecords);

                    for (var i = 2; i < optionArray.length - 2; i++) { // skip first two
                        // and last two
                        // records.
                        var jsonData = {};
                        setValue(jsonData, "optionEntryCode", optionArray[i], 2, 8);
                        jsonData.syllabusDto = {
                            "code": optionArray[i].substring(8, 14).trim(),
                            "examSeries": {
                                "examSeriesId": examSeriesId
                            }
                        };
                        if (optionArray[i].substring(14, 21).trim().length && "CB".includes(optionArray[i].substring(21, 22).toUpperCase())) {
                            // Certification examTypes are specified
                            jsonData.examTypeQualificationCert = optionArray[i].substring(14, 18).trim();
                            jsonData.examTypeLevelCert = optionArray[i].substring(18, 21).trim();
                        }
                        if (optionArray[i].substring(22, 29).trim().length && "BU".includes(optionArray[i].substring(21, 22).toUpperCase())) {
                            // Unit examTypes are specified
                            jsonData.examTypeQualificationUnit = optionArray[i].substring(22, 26).trim();
                            jsonData.examTypeLevelUnit = optionArray[i].substring(26, 29).trim();
                        }
                        setValue(jsonData, "process", optionArray[i], 29, 30);
                        setValue(jsonData, "qcaClassificationCode", optionArray[i], 30, 34);
                        setValue(jsonData, "qcaAccreditationNo", optionArray[i], 34, 42);
                        setValue(jsonData, "optionTitle", optionArray[i], 42, 78);
                        jsonData.feeDefined = optionArray[i].substring(78, 79);
                        if (optionArray[i].substring(78, 79) == "Y") {
                            setValue(jsonData, "examinationFee", optionArray[i], 79, 84);
                        }
                        setValue(jsonData, "firstForecastGradeGradeset", optionArray[i], 84, 88);
                        setValue(jsonData, "secondForecastGradeGradeset", optionArray[i], 88, 92);
                        setValue(jsonData, "resultType", optionArray[i], 92, 93);
                        setValue(jsonData, "firstGradeResultGradeset", optionArray[i], 93, 97);
                        setValue(jsonData, "secondGradeResultGradeset", optionArray[i], 97, 101);
                        setValue(jsonData, "endorsementToFirstGradeResultGradeset", optionArray[i], 101, 105);
                        setValue(jsonData, "endorsementToSecondGradeResultGradeset", optionArray[i], 105, 109);
                        setValue(jsonData, "maxMarkUms", optionArray[i], 109, 113);
                        setValue(jsonData, "noOfComponents", optionArray[i], 113, 115);

                        Option.create(JSON.stringify(jsonData))
                            .then(function(response) { // jshint ignore:line
                                processedCount++;
                                updateProgressBar(processedCount, totalRecords);
                                if (processedCount == totalRecords) {
                                    processed.o = true;
                                }
                                if (response.error !== undefined && response.error.status == 400) {
                                    updateProgressMessage(response.error.exception + ":  " + response.error.message);
                                }
                            }); // jshint ignore:line
                    }
                }

                function processComponents(contents) {
                    var componentArray = contents.split("\n");
                    if (!componentArray[componentArray.length - 1] || 0 === componentArray[componentArray.length - 1].length) {
                        //Check if the last line is blank, and remove it if it is.
                        //This resolves the discrepancy between exam boards terminating (or not) the final line with CR LF
                        componentArray.splice(componentArray.length - 1, 1);
                    }

                    var totalRecords = Number(componentArray[componentArray.length - 2].substring(7, 14) - 2);
                    var processedCount = 0;

                    updateOverallProgress("Processing Components - " + totalRecords + " records.");
                    updateProgressBar(processedCount, totalRecords);

                    for (var i = 2; i < componentArray.length - 2; i++) { // skip first
                        // two and last
                        // two records.
                        var jsonData = {};
                        jsonData.examSeries = {
                            "examSeriesId": examSeriesId
                        };
                        jsonData.code = componentArray[i].substring(2, 14).trim();
                        jsonData.title = componentArray[i].substring(14, 50).trim();
                        jsonData.teacherMarks = componentArray[i].substring(50, 51);
                        setValue(jsonData, "maximumMarks", componentArray[i], 51, 54);
                        setValue(jsonData, "componentGradeset", componentArray[i], 54, 58);

                        if (componentArray[i].substring(58, 64).trim().length) {
                            jsonData.dueDate = "20" + componentArray[i].substring(62, 64) + "-" + componentArray[i].substring(60, 62) + "-" + componentArray[i].substring(58, 60);
                        }

                        jsonData.timetabled = componentArray[i].substring(64, 65);
                        if (componentArray[i].substring(65, 71).trim().length) {
                            jsonData.timetableDate = "20" + componentArray[i].substring(69, 71) + "-" + componentArray[i].substring(67, 69) + "-" + componentArray[i].substring(65, 67);
                        }

                        setValue(jsonData, "timetableSession", componentArray[i], 71, 72);
                        setValue(jsonData, "timeAllowed", componentArray[i], 72, 75);

                        Component.create(JSON.stringify(jsonData))
                            .then(function(response) { // jshint ignore:line
                                processedCount++;
                                updateProgressBar(processedCount, totalRecords);
                                if (processedCount == totalRecords) {
                                    processed.c = true;
                                }
                                if (response.error !== undefined && response.error.status == 400) {
                                    updateProgressMessage(response.error.exception + ":  " + response.error.message);
                                }
                            }); // jshint ignore:line
                    }
                }

                function processLinks(contents) {
                    var linkArray = contents.split("\n");
                    if (!linkArray[linkArray.length - 1] || 0 === linkArray[linkArray.length - 1].length) {
                        //Check if the last line is blank, and remove it if it is.
                        //This resolves the discrepancy between exam boards terminating (or not) the final line with CR LF
                        linkArray.splice(linkArray.length - 1, 1);
                    }

                    var totalRecords = Number(linkArray[linkArray.length - 2].substring(7, 14) - 2);
                    var processedCount = 0;

                    updateOverallProgress("Processing Links - " + totalRecords + " records.");
                    updateProgressBar(processedCount, totalRecords);

                    var jsonData = {
                        "examOption": {
                            "syllabus": {
                                "examSeries": {
                                    "examSeriesId": ""
                                }
                            }
                        },
                        "examComponent": {
                            "examSeries": {
                                "examSeriesId": ""
                            }
                        }
                    };
                    jsonData.examOption.syllabus.examSeries.examSeriesId = examSeriesId;
                    jsonData.examComponent.examSeries.examSeriesId = examSeriesId;

                    for (var i = 2; i < linkArray.length - 2; i++) {
                        jsonData.examOption.optionEntryCode = linkArray[i].substring(2, 8).trim();
                        jsonData.examComponent.code = linkArray[i].substring(8, 20).trim();

                        OptionComponent.create(JSON.stringify(jsonData))
                            .then(function(response) { // jshint ignore:line
                                processedCount++;
                                updateProgressBar(processedCount, totalRecords);
                                if (processedCount == totalRecords) {
                                    // processed["l"] = true;
                                    delete intervalTimer.s;
                                    delete intervalTimer.o;
                                    delete intervalTimer.c;
                                    intervalTimer = undefined;

                                    updateOverallProgress("Import complete.");
                                    updateProgressBar(1, 1);
                                }
                                if (response.error !== undefined && response.error.status == 400) {
                                    updateProgressMessage(response.error.exception + ":  " + response.error.message);
                                }
                            }); // jshint ignore:line

                    }
                }

                function setValue(obj, prop, string, start, end) {
                    if (string.substring(start, end).trim().length) {
                        obj[prop] = string.substring(start, end).trim();
                    }
                }

                function watch(obj, prop, handler, param) {
                    if (obj[prop] === true) {
                        clearInterval(intervalTimer[prop]);
                        handler(param);
                    }
                }

                function updateProgressMessage(message) {
                    document.getElementById("progress_messages").innerHTML = document.getElementById("progress_messages").innerHTML + "<BR>" + message;
                }

                function updateOverallProgress(stepName) {
                    progressStepNo = ++progressStepNo;
                    document.getElementById("overall_progress").innerHTML = "Step " + progressStepNo + " of 9";
                    updateProgressMessage(stepName);
                }
            };
        });
})();
