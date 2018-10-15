describe('SchoolService', function() {

    var httpBackend;
    var school;

    beforeEach(module('SchoolService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/schools/').respond(200, [{
            id: 1,
            name: '2',
            postcode: 'Cr3 1ya',
            line1: '/'
        }]);
        httpBackend.whenGET('/api/schools/1').respond(200, {});
        httpBackend.whenPOST('/api/schools/').respond(201, {
            id: 2,
            name: '1',
            postcode: 'CR53YA',
            line1: '/'
        });
        httpBackend.whenPUT('/api/schools/2').respond(200, {
            id: 2,
            name: '1',
            postcode: 'CR53YA',
            line1: '/'
        });
        school = $injector.get('School');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the schools', function() {
        httpBackend.expectGET('/api/schools/');
        school.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific school', function() {
        httpBackend.expectGET('/api/schools/1');
        school.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new school', inject(function($http) {
        httpBackend.expectPOST('/api/schools/', {
            name: '1'
        });
        school.create({
            name: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 2,
                name: '1',
                postcode: 'CR53YA',
                line1: '/'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing school', function() {
        httpBackend.expectPUT('/api/schools/2');
        school.save({
            id: 2,
            name: '1',
            postcode: 'CR53YA',
            line1: '/'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 2,
                name: '1',
                postcode: 'CR53YA',
                line1: '/'
            });
        });
        httpBackend.flush();
    });

});
