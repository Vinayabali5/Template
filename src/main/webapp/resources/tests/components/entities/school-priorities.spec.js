describe('SchoolPriorityService', function() {

    var httpBackend;
    var schoolPriority;

    beforeEach(module('SchoolPriorityService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/schoolPriorities/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme offer'
        }]);
        httpBackend.whenGET('/api/schoolPriorities/1').respond(200, {});
        httpBackend.whenPOST('/api/schoolPriorities/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme offer'
        });
        httpBackend.whenPUT('/api/schoolPriorities/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme offer'
        });
        schoolPriority = $injector.get('SchoolPriority');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the schoolPrioritys', function() {
        httpBackend.expectGET('/api/schoolPriorities/');
        schoolPriority.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific schoolPriority', function() {
        httpBackend.expectGET('/api/schoolPriorities/1');
        schoolPriority.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new schoolPriority', inject(function($http) {
        httpBackend.expectPOST('/api/schoolPriorities/', {
            code: '1'
        });
        schoolPriority.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme offer'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing offertype', function() {
        httpBackend.expectPUT('/api/schoolPriorities/1');
        schoolPriority.save({
            id: 1,
            code: '1',
            description: 'Programme offer'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme offer'
            });
        });
        httpBackend.flush();
    });

});
