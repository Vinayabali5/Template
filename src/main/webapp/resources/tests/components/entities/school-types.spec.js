describe('SchoolTypeService', function() {

    var httpBackend;
    var schoolType;

    beforeEach(module('SchoolTypeService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/schoolTypes/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme school'
        }]);
        httpBackend.whenGET('/api/schoolTypes/1').respond(200, {});
        httpBackend.whenPOST('/api/schoolTypes/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme school'
        });
        httpBackend.whenPUT('/api/schoolTypes/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme school'
        });
        schoolType = $injector.get('SchoolType');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the schoolTypes', function() {
        httpBackend.expectGET('/api/schoolTypes/');
        schoolType.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific schoolType', function() {
        httpBackend.expectGET('/api/schoolTypes/1');
        schoolType.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new schoolType', inject(function($http) {
        httpBackend.expectPOST('/api/schoolTypes/', {
            code: '1'
        });
        schoolType.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme school'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing schooltype', function() {
        httpBackend.expectPUT('/api/schoolTypes/1');
        schoolType.save({
            id: 1,
            code: '1',
            description: 'Programme school'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme school'
            });
        });
        httpBackend.flush();
    });

});
