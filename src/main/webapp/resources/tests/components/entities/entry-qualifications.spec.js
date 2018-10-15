describe('EntryQualificationService', function() {

    var httpBackend;
    var entryQualification;

    beforeEach(module('EntryQualificationService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/entryQualifications/').respond(200, [{
            id: 1,
            basicList: true,
            dataMatchCode: 'EntryQualification B',
            entryQualificationTypeId: 3,
            shortCourse: true,
            title: 'Maths',
            webLinkCode: 4
        }]);
        httpBackend.whenGET('/api/entryQualifications/1').respond(200, {});

        entryQualification = $injector.get('EntryQualification');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the entryQualifications', function() {
        httpBackend.expectGET('/api/entryQualifications/');
        entryQualification.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific entryQualification', function() {
        httpBackend.expectGET('/api/entryQualifications/1');
        entryQualification.get(1);
        httpBackend.flush();
    });


});
