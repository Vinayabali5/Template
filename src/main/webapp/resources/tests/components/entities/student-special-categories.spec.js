describe('StudentSpecialCategoryService', function() {

    var httpBackend;
    var studentSpecialCategory;

    beforeEach(module('StudentSpecialCategoryService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/').respond(200, [{
            id: 1,
            monitoringNotes: '1',
            outsideAgenciesInvolved: 'Programme aim',
            riskToStudentOrOthers: 'Programme Aim'
        }]);
        httpBackend.whenGET('/api/studentSpecialCategories/1').respond(200, {});
        httpBackend.whenPOST('/api/studentSpecialCategories').respond(201, {
            id: 1,
            monitoringNotes: '1',
            outsideAgenciesInvolved: 'Programme aim',
            riskToStudentOrOthers: 'Programme Aim'
        });
        httpBackend.whenPUT('/api/studentSpecialCategories/1').respond(200, {
            id: 1,
            monitoringNotes: '1',
            outsideAgenciesInvolved: 'Programme aim',
            riskToStudentOrOthers: 'Programme Aim'
        });
        studentSpecialCategory = $injector.get('StudentSpecialCategory');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the studentSpecialCategories', function() {
        httpBackend.expectGET('/api/');
        studentSpecialCategory.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific studentSpecialCategory', function() {
        httpBackend.expectGET('/api/studentSpecialCategories/1');
        studentSpecialCategory.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new studentSpecialCategory', inject(function($http) {
        httpBackend.expectPOST('/api/studentSpecialCategories', {
            monitoringNotes: '1'
        });
        studentSpecialCategory.create({
            monitoringNotes: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                monitoringNotes: '1',
                outsideAgenciesInvolved: 'Programme aim',
                riskToStudentOrOthers: 'Programme Aim'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing aimtype', function() {
        httpBackend.expectPUT('/api/studentSpecialCategories/1');
        studentSpecialCategory.save({
            id: 1,
            monitoringNotes: '1',
            outsideAgenciesInvolved: 'Programme aim',
            riskToStudentOrOthers: 'Programme Aim'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                monitoringNotes: '1',
                outsideAgenciesInvolved: 'Programme aim',
                riskToStudentOrOthers: 'Programme Aim'
            });
        });
        httpBackend.flush();
    });

});
