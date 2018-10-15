describe('SpecialCategoryService', function() {

    var httpBackend;
    var specialCategory;

    beforeEach(module('SpecialCategoryService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/specialCategories/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme offer'
        }]);
        httpBackend.whenGET('/api/specialCategories/1').respond(200, {});
        httpBackend.whenPOST('/api/specialCategories/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme offer'
        });
        httpBackend.whenPUT('/api/specialCategories/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme offer'
        });
        specialCategory = $injector.get('SpecialCategory');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the specialCategorys', function() {
        httpBackend.expectGET('/api/specialCategories/');
        specialCategory.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific specialCategory', function() {
        httpBackend.expectGET('/api/specialCategories/1');
        specialCategory.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new specialCategory', inject(function($http) {
        httpBackend.expectPOST('/api/specialCategories/', {
            code: '1'
        });
        specialCategory.create({
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
        httpBackend.expectPUT('/api/specialCategories/1');
        specialCategory.save({
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
