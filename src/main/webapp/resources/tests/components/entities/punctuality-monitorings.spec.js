//describe('PunctualityMonitoringService', function() {
//
//    var httpBackend;
//    var punctualityMonitoring;
//
//    beforeEach(module('PunctualityMonitoringService'));
//
//    beforeEach(inject(function($injector) {
//        httpBackend = $injector.get('$httpBackend');
//        httpBackend.whenGET('/api/punctualityMonitorings/').respond(200, [{
//            id: 1,
//            code: '2',
//            description: 'PunctualityMonitoring B',
//            warningColour: '/'
//        }]);
//        httpBackend.whenGET('/api/punctualityMonitorings/1').respond(200, {});
//        httpBackend.whenPOST('/api/punctualityMonitorings/').respond(201, {
//            id: 2,
//            code: '1',
//            description: 'PunctualityMonitoring A',
//            warningColour: '/'
//        });
//        httpBackend.whenPUT('/api/punctualityMonitorings/2').respond(200, {
//            id: 2,
//            code: '1',
//            description: 'PunctualityMonitoring A',
//            warningColour: '/'
//        });
//        punctualityMonitoring = $injector.get('PunctualityMonitoring');
//    }));
//
//    afterEach(function() {
//        httpBackend.verifyNoOutstandingRequest();
//        httpBackend.verifyNoOutstandingExpectation();
//
//    });
//
//    it('should GET for api to retrieve all the punctualityMonitorings', function() {
//        httpBackend.expectGET('/api/punctualityMonitorings/');
//        punctualityMonitoring.query();
//        httpBackend.flush();
//    });
//
//
//    it('should GET from api to retrieve a specific punctualityMonitoring', function() {
//        httpBackend.expectGET('/api/punctualityMonitorings/1');
//        punctualityMonitoring.get(1);
//        httpBackend.flush();
//    });
//
//    it('should POST to api to create a new punctualityMonitoring', inject(function($http) {
//        httpBackend.expectPOST('/api/punctualityMonitorings/', {
//            code: '1'
//        });
//        punctualityMonitoring.create({
//            code: '1'
//        }).then(function(response) {
//            expect(response).toEqual({
//                id: 2,
//                code: '1',
//                description: 'PunctualityMonitoring A',
//                warningColour: '/'
//            });
//        });
//        httpBackend.flush();
//    }));
//
//    it('should PUT to api to update an existing punctualityMonitoring', function() {
//        httpBackend.expectPUT('/api/punctualityMonitorings/2');
//        punctualityMonitoring.save({
//            id: 2,
//            code: '1',
//            description: 'PunctualityMonitoring A',
//            warningColour: '/'
//        }, function() {}).then(function(response) {
//            expect(response).toEqual({
//                id: 2,
//                code: '1',
//                description: 'PunctualityMonitoring A',
//                warningColour: '/'
//            });
//        });
//        httpBackend.flush();
//    });
//
//});
