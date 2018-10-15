describe('SubjectService', function() {

    var httpBackend;
    var subject;

    beforeEach(module('SubjectService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/subjects/').respond(200, [{
            id: 1,
            code: '1',
            description: 'maths'
        }]);
        httpBackend.whenGET('/api/subjects/1').respond(200, {});
        httpBackend.whenPOST('/api/subjects/').respond(201, {
            id: 1,
            code: '1',
            description: 'maths'
        });
        httpBackend.whenPUT('/api/subjects/1').respond(200, {
            id: 1,
            code: '1',
            description: 'maths'
        });
        subject = $injector.get('Subject');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the subjects', function() {
        httpBackend.expectGET('/api/subjects/');
        subject.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific subject', function() {
        httpBackend.expectGET('/api/subjects/1');
        subject.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new subject', inject(function($http) {
        httpBackend.expectPOST('/api/subjects/', {
            code: '1'
        });
        subject.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'maths'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing notetype', function() {
        httpBackend.expectPUT('/api/subjects/1');
        subject.save({
            id: 1,
            code: '1',
            description: 'maths'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'maths'
            });
        });
        httpBackend.flush();
    });

});
