describe('ApplicationStatusService', function() {

    var httpBackend;
    var applicationStatus;

    beforeEach(module('ApplicationStatusService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/applicationStatuses/').respond(200, [{
            id: 1,
            code: 'A',
            description: 'Active',
            considerWithdrawn: true
        }]);
        httpBackend.whenGET('/api/applicationStatuses/1').respond(200, {});
        httpBackend.whenPOST('/api/applicationStatuses/').respond(201, {
            id: 2,
            code: 'N',
            description: 'New',
            considerWithdrawn: false
        });
        httpBackend.whenPUT('/api/applicationStatuses/2').respond(200, {
            id: 2,
            code: 'N',
            description: 'New',
            considerWithdrawn: false
        });
        applicationStatus = $injector.get('ApplicationStatus');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the applicationStatuses', function() {
        httpBackend.expectGET('/api/applicationStatuses/');
        applicationStatus.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific applicationStatus', function() {
        httpBackend.expectGET('/api/applicationStatuses/1');
        applicationStatus.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new applicationStatus', inject(function($http) {
        httpBackend.expectPOST('/api/applicationStatuses/', {
            code: 'N'
        });
        applicationStatus.create({
            code: 'N'
        }).then(function(response) {
            expect(response).toEqual({
                id: 2,
                code: 'N',
                description: 'New',
                considerWithdrawn: false
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing applicationStatus', function() {
        httpBackend.expectPUT('/api/applicationStatuses/2');
        applicationStatus.save({
            id: 2,
            code: 'N',
            description: 'New',
            considerWithdrawn: false
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 2,
                code: 'N',
                description: 'New',
                considerWithdrawn: false
            });
        });
        httpBackend.flush();
    });

});
