describe('ContactTypeService', function() {

    var httpBackend;
    var contactType;

    beforeEach(module('ContactTypeService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/contactTypes/').respond(200, [{
            id: 1,
            code: 'F',
            description: 'Father'
        }]);
        httpBackend.whenGET('/api/contactTypes/1').respond(200, {});
        httpBackend.whenPOST('/api/contactTypes/').respond(201, {
            id: 2,
            code: 'M',
            description: 'Mother'
        });
        httpBackend.whenPUT('/api/contactTypes/2').respond(200, {
            id: 2,
            code: 'M',
            description: 'Mother'
        });
        contactType = $injector.get('ContactType');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the contactTypes', function() {
        httpBackend.expectGET('/api/contactTypes/');
        contactType.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific contactType', function() {
        httpBackend.expectGET('/api/contactTypes/1');
        contactType.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new contactType', inject(function($http) {
        httpBackend.expectPOST('/api/contactTypes/', {
            code: 'M'
        });
        contactType.create({
            code: 'M'
        }).then(function(response) {
            expect(response).toEqual({
                id: 2,
                code: 'M',
                description: 'Mother'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing contactType', function() {
        httpBackend.expectPUT('/api/contactTypes/2');
        contactType.save({
            id: 2,
            code: 'M',
            description: 'Mother'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 2,
                code: 'M',
                description: 'Mother'
            });
        });
        httpBackend.flush();
    });

});
