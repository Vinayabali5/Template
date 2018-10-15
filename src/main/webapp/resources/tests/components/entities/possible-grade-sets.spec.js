describe('PossibleGradeSetService', function() {

    var httpBackend;
    var possibleGradeSet;

    beforeEach(module('PossibleGradeSetService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/possibleGradeSets/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme note'
        }]);
        httpBackend.whenGET('/api/possibleGradeSets/1').respond(200, {});
        httpBackend.whenPOST('/api/possibleGradeSets/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme note'
        });
        httpBackend.whenPUT('/api/possibleGradeSets/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme note'
        });
        possibleGradeSet = $injector.get('PossibleGradeSet');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the possibleGradeSets', function() {
        httpBackend.expectGET('/api/possibleGradeSets/');
        possibleGradeSet.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific possibleGradeSet', function() {
        httpBackend.expectGET('/api/possibleGradeSets/1');
        possibleGradeSet.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new possibleGradeSet', inject(function($http) {
        httpBackend.expectPOST('/api/possibleGradeSets/', {
            code: '1'
        });
        possibleGradeSet.create({
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
        httpBackend.expectPUT('/api/possibleGradeSets/1');
        possibleGradeSet.save({
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
