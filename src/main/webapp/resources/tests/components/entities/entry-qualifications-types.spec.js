describe('EntryQualificationTypeService', function() {

    var httpBackend;
    var entryQualificationType;

    beforeEach(module('EntryQualificationTypeService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/entryQualificationTypes/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme entryQualification'
        }]);
        httpBackend.whenGET('/api/entryQualificationTypes/1').respond(200, {});
        httpBackend.whenPOST('/api/entryQualificationTypes/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme entryQualification'
        });
        httpBackend.whenPUT('/api/entryQualificationTypes/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme entryQualification'
        });
        entryQualificationType = $injector.get('EntryQualificationType');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the entryQualificationTypes', function() {
        httpBackend.expectGET('/api/entryQualificationTypes/');
        entryQualificationType.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific entryQualificationType', function() {
        httpBackend.expectGET('/api/entryQualificationTypes/1');
        entryQualificationType.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new entryQualificationType', inject(function($http) {
        httpBackend.expectPOST('/api/entryQualificationTypes/', {
            code: '1'
        });
        entryQualificationType.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme entryQualification'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing entryQualificationtype', function() {
        httpBackend.expectPUT('/api/entryQualificationTypes/1');
        entryQualificationType.save({
            id: 1,
            code: '1',
            description: 'Programme entryQualification'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme entryQualification'
            });
        });
        httpBackend.flush();
    });

});
