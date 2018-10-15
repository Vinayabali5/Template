describe('StudentTypeService', function() {

    var httpBackend;
    var studentType;

    beforeEach(module('StudentTypeService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/studentTypes/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme student'
        }]);
        httpBackend.whenGET('/api/studentTypes/1').respond(200, {});
        httpBackend.whenPOST('/api/studentTypes/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme student'
        });
        httpBackend.whenPUT('/api/studentTypes/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme student'
        });
        studentType = $injector.get('StudentType');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the studentTypes', function() {
        httpBackend.expectGET('/api/studentTypes/');
        studentType.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific studentType', function() {
        httpBackend.expectGET('/api/studentTypes/1');
        studentType.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new studentType', inject(function($http) {
        httpBackend.expectPOST('/api/studentTypes/', {
            code: '1'
        });
        studentType.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme student'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing studenttype', function() {
        httpBackend.expectPUT('/api/studentTypes/1');
        studentType.save({
            id: 1,
            code: '1',
            description: 'Programme student'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme student'
            });
        });
        httpBackend.flush();
    });

});
