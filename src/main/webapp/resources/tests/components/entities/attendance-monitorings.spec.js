//describe('AttendanceMonitoringService', function() {
//
//    var httpBackend;
//    var attendanceMonitoring;
//
//    beforeEach(module('AttendanceMonitoringService'));
//
//    beforeEach(inject(function($injector) {
//        httpBackend = $injector.get('$httpBackend');
//        httpBackend.whenGET('/api/attendanceMonitorings/').respond(200, [{
//            id: 1,
//            code: '2',
//            description: 'Absent',
//            warningColour: '/'
//        }]);
//        httpBackend.whenGET('/api/attendanceMonitorings/1').respond(200, {});
//        httpBackend.whenPOST('/api/attendanceMonitorings/').respond(201, {
//            id: 2,
//            code: '1',
//            description: 'Present',
//            warningColour: '/'
//        });
//        httpBackend.whenPUT('/api/attendanceMonitorings/2').respond(200, {
//            id: 2,
//            code: '1',
//            description: 'Present',
//            warningColour: '/'
//        });
//        attendanceMonitoring = $injector.get('AttendanceMonitoring');
//    }));
//
//    afterEach(function() {
//        httpBackend.verifyNoOutstandingRequest();
//        httpBackend.verifyNoOutstandingExpectation();
//
//    });
//
//    it('should GET for api to retrieve all the attendanceMonitorings', function() {
//        httpBackend.expectGET('/api/attendanceMonitorings/');
//        attendanceMonitoring.query();
//        httpBackend.flush();
//    });
//
//
//    it('should GET from api to retrieve a specific attendanceMonitoring', function() {
//        httpBackend.expectGET('/api/attendanceMonitorings/1');
//        attendanceMonitoring.get(1);
//        httpBackend.flush();
//    });
//
//    it('should POST to api to create a new attendanceMonitoring', inject(function($http) {
//        httpBackend.expectPOST('/api/attendanceMonitorings/', {
//            code: '1'
//        });
//        attendanceMonitoring.create({
//            code: '1'
//        }).then(function(response) {
//            expect(response).toEqual({
//                id: 2,
//                code: '1',
//                description: 'Present',
//                warningColour: '/'
//            });
//        });
//        httpBackend.flush();
//    }));
//
//    it('should PUT to api to update an existing attendanceMonitoring', function() {
//        httpBackend.expectPUT('/api/attendanceMonitorings/2');
//        attendanceMonitoring.save({
//            id: 2,
//            code: '1',
//            description: 'Present',
//            warningColour: '/'
//        }, function() {}).then(function(response) {
//            expect(response).toEqual({
//                id: 2,
//                code: '1',
//                description: 'Present',
//                warningColour: '/'
//            });
//        });
//        httpBackend.flush();
//    });
//
//});
