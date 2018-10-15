describe('LevelService', function() {

    var httpBackend;
    var level;

    beforeEach(module('LevelService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/levels/').respond(200, [{
            id: 1,
            code: '2',
            description: 'GCSE',
            progressionTo: '/'
        }]);
        httpBackend.whenGET('/api/levels/1').respond(200, {});
        httpBackend.whenPOST('/api/levels/').respond(201, {
            id: 2,
            code: '1',
            description: 'A Level',
            progressionTo: '/'
        });
        httpBackend.whenPUT('/api/levels/2').respond(200, {
            id: 2,
            code: '1',
            description: 'A Level',
            progressionTo: '/'
        });
        level = $injector.get('Level');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the levels', function() {
        httpBackend.expectGET('/api/levels/');
        level.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific level', function() {
        httpBackend.expectGET('/api/levels/1');
        level.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new level', inject(function($http) {
        httpBackend.expectPOST('/api/levels/', {
            code: '1'
        });
        level.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 2,
                code: '1',
                description: 'A Level',
                progressionTo: '/'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing level', function() {
        httpBackend.expectPUT('/api/levels/2');
        level.save({
            id: 2,
            code: '1',
            description: 'A Level',
            progressionTo: '/'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 2,
                code: '1',
                description: 'A Level',
                progressionTo: '/'
            });
        });
        httpBackend.flush();
    });

});
