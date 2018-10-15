describe('RestrictedUseIndicatorService', function() {

    var httpBackend;
    var restrictedUseIndicator;

    beforeEach(module('RestrictedUseIndicatorService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/restrictedUseIndicators/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        }]);
        httpBackend.whenGET('/api/restrictedUseIndicators/1').respond(200, {});
        httpBackend.whenPOST('/api/restrictedUseIndicators/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        });
        httpBackend.whenPUT('/api/restrictedUseIndicators/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        });
        restrictedUseIndicator = $injector.get('RestrictedUseIndicator');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the restrictedUseIndicators', function() {
        httpBackend.expectGET('/api/restrictedUseIndicators/');
        restrictedUseIndicator.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific restrictedUseIndicator', function() {
        httpBackend.expectGET('/api/restrictedUseIndicators/1');
        restrictedUseIndicator.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new restrictedUseIndicator', inject(function($http) {
        httpBackend.expectPOST('/api/restrictedUseIndicators/', {
            code: '1'
        });
        restrictedUseIndicator.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme aim',
                shortDescription: 'Programme Aim'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing aimtype', function() {
        httpBackend.expectPUT('/api/restrictedUseIndicators/1');
        restrictedUseIndicator.save({
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme aim',
                shortDescription: 'Programme Aim'
            });
        });
        httpBackend.flush();
    });

});
