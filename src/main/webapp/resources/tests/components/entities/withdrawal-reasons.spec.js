describe('WithdrawalReasonService', function() {

    var httpBackend;
    var withdrawalReason;

    beforeEach(module('WithdrawalReasonService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/withdrawalReasons/').respond(200, [{
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        }]);
        httpBackend.whenGET('/api/withdrawalReasons/1').respond(200, {});
        httpBackend.whenPOST('/api/withdrawalReasons/').respond(201, {
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        });
        httpBackend.whenPUT('/api/withdrawalReasons/1').respond(200, {
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        });
        withdrawalReason = $injector.get('WithdrawalReason');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the withdrawalReasons', function() {
        httpBackend.expectGET('/api/withdrawalReasons/');
        withdrawalReason.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific withdrawalReason', function() {
        httpBackend.expectGET('/api/withdrawalReasons/1');
        withdrawalReason.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new withdrawalReason', inject(function($http) {
        httpBackend.expectPOST('/api/withdrawalReasons/', {
            code: '1'
        });
        withdrawalReason.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme aim',
                shortDescription: 'Programme Aim'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing aimtype', function() {
        httpBackend.expectPUT('/api/withdrawalReasons/1');
        withdrawalReason.save({
            id: 1,
            code: '1',
            description: 'Programme aim',
            shortDescription: 'Programme Aim'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 1,
                code: '1',
                description: 'Programme aim',
                shortDescription: 'Programme Aim'
            });
        });
        httpBackend.flush();
    });

});
