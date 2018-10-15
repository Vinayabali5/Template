describe('PossibleGradeService', function() {

    var httpBackend;
    var possibleGrade;

    beforeEach(module('PossibleGradeService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/possibleGrades/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme note'
        }]);
        httpBackend.whenGET('/api/possibleGrades/1').respond(200, {});
        httpBackend.whenPOST('/api/possibleGrades/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme note'
        });
        httpBackend.whenPUT('/api/possibleGrades/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme note'
        });
        possibleGrade = $injector.get('PossibleGrade');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the possibleGrades', function() {
        httpBackend.expectGET('/api/possibleGrades/');
        possibleGrade.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific possibleGrade', function() {
        httpBackend.expectGET('/api/possibleGrades/1');
        possibleGrade.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new possibleGrade', inject(function($http) {
        httpBackend.expectPOST('/api/possibleGrades/', {
            code: '1'
        });
        possibleGrade.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme note'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing notetype', function() {
        httpBackend.expectPUT('/api/possibleGrades/1');
        possibleGrade.save({
            id: 1,
            code: '1',
            description: 'Programme note'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme note'
            });
        });
        httpBackend.flush();
    });

});
