describe('ProgrammeTypeService', function() {

    var httpBackend;
    var programmeType;

    beforeEach(module('ProgrammeTypeService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/programmeTypes/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        }]);
        httpBackend.whenGET('/api/programmeTypes/1').respond(200, {});
        httpBackend.whenPOST('/api/programmeTypes/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        });
        httpBackend.whenPUT('/api/programmeTypes/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        });
        programmeType = $injector.get('ProgrammeType');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the programmeTypes', function() {
        httpBackend.expectGET('/api/programmeTypes/');
        programmeType.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific programmeType', function() {
        httpBackend.expectGET('/api/programmeTypes/1');
        programmeType.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new programmeType', inject(function($http) {
        httpBackend.expectPOST('/api/programmeTypes/', {
            code: '1'
        });
        programmeType.create({
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
        httpBackend.expectPUT('/api/programmeTypes/1');
        programmeType.save({
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
