describe('CorrespondenceService', function() {

    var httpBackend;
    var correspondence;

    beforeEach(module('CorrespondenceService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/').respond(200, [{
            id: 1,
            studentId: '17001',
            title: 'Correspondence B',
            to: 'vinaya',
            privateEntry: true,
            letterId: 2,
            processStage: 0,
            correspondence: 'C'
        }]);
        httpBackend.whenGET('/api/correspondences/1').respond(200, {});
        httpBackend.whenGET('/api/students/17001/correspondence').respond(200, {});
        httpBackend.whenPOST('/api/correspondences').respond(201, {
            id: 2,
            studentId: '17001',
            title: 'Correspondence B',
            to: 'vinaya',
            privateEntry: true,
            letterId: 2,
            processStage: 0,
            correspondence: 'C'
        });
        httpBackend.whenPUT('/api/correspondences/2').respond(200, {
            id: 2,
            studentId: '17001',
            title: 'Correspondence B',
            to: 'vinaya',
            privateEntry: true,
            letterId: 2,
            processStage: 0,
            correspondence: 'C'
        });
        correspondence = $injector.get('Correspondence');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the correspondences', function() {
        httpBackend.expectGET('/api/');
        correspondence.query();
        httpBackend.flush();
    });

    it('should GET from api to retrieve a specific correspondence', function() {
        httpBackend.expectGET('/api/students/17001/correspondence');
        correspondence.get(17001);
        httpBackend.flush();
    });

    it('should GET from api to retrieve a specific correspondence', function() {
        httpBackend.expectGET('/api/correspondences/1');
        correspondence.getId(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new correspondence', inject(function($http) {
        httpBackend.expectPOST('/api/correspondences', {
            studentId: '17001',
            title: 'Correspondence B',
            to: 'vinaya',
            privateEntry: true,
            letterId: 2,
            processStage: 0,
            correspondence: 'C'
        });
        correspondence.create({
            studentId: '17001',
            title: 'Correspondence B',
            to: 'vinaya',
            privateEntry: true,
            letterId: 2,
            processStage: 0,
            correspondence: 'C'
        }).then(function(response) {
            expect(response).toEqual({
                id: 2,
                studentId: '17001',
                title: 'Correspondence B',
                to: 'vinaya',
                privateEntry: true,
                letterId: 2,
                processStage: 0,
                correspondence: 'C'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing correspondence', function() {
        httpBackend.expectPUT('/api/correspondences/2');
        correspondence.save({
            id: 2,
            studentId: '17001',
            title: 'Correspondence B',
            to: 'vinaya',
            privateEntry: true,
            letterId: 2,
            processStage: 0,
            correspondence: 'C'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 2,
                studentId: '17001',
                title: 'Correspondence B',
                to: 'vinaya',
                privateEntry: true,
                letterId: 2,
                processStage: 0,
                correspondence: 'C'
            });
        });
        httpBackend.flush();
    });

});
