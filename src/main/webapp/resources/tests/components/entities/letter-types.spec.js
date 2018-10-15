describe('LetterTypeService', function() {

    var httpBackend;
    var letterType;

    beforeEach(module('LetterTypeService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/letterTypes/').respond(200, [{
            id: 1,
            type: '1'
        }]);
        httpBackend.whenGET('/api/letterTypes/1').respond(200, {});
        httpBackend.whenPUT('/api/letterTypes/1').respond(200, {
            id: 1,
            type: '1'
        });
        letterType = $injector.get('LetterType');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the letterTypes', function() {
        httpBackend.expectGET('/api/letterTypes/');
        letterType.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific letterType', function() {
        httpBackend.expectGET('/api/letterTypes/1');
        letterType.get(1);
        httpBackend.flush();
    });


    it('should PUT to api to update an existing lettertype', function() {
        httpBackend.expectPUT('/api/letterTypes/1');
        letterType.save({
            id: 1,
            type: '1',
            description: 'Programme letter'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                type: '1'
            });
        });
        httpBackend.flush();
    });

});
