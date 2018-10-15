describe('RoomService', function() {

    var httpBackend;
    var room;

    beforeEach(module('RoomService'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        httpBackend.whenGET('/api/rooms/').respond(200, [{
            id: 1,
            code: '2',
            description: 'Room 2',
            capacity: '/'
        }]);
        httpBackend.whenGET('/api/rooms/1').respond(200, {});
        httpBackend.whenPOST('/api/rooms/').respond(201, {
            id: 2,
            code: '1',
            description: 'Room 1',
            capacity: '/'
        });
        httpBackend.whenPUT('/api/rooms/2').respond(200, {
            id: 2,
            code: '1',
            description: 'Room 1',
            capacity: '/'
        });
        room = $injector.get('Room');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();

    });

    it('should GET for api to retrieve all the rooms', function() {
        httpBackend.expectGET('/api/rooms/');
        room.query();
        httpBackend.flush();
    });


    it('should GET from api to retrieve a specific room', function() {
        httpBackend.expectGET('/api/rooms/1');
        room.get(1);
        httpBackend.flush();
    });

    it('should POST to api to create a new room', inject(function($http) {
        httpBackend.expectPOST('/api/rooms/', {
            code: '1'
        });
        room.create({
            code: '1'
        }).then(function(response) {
            expect(response).toEqual({
                id: 2,
                code: '1',
                description: 'Room 1',
                capacity: '/'
            });
        });
        httpBackend.flush();
    }));

    it('should PUT to api to update an existing room', function() {
        httpBackend.expectPUT('/api/rooms/2');
        room.save({
            id: 2,
            code: '1',
            description: 'Room 1',
            capacity: '/'
        }, function() {}).then(function(response) {
            expect(response).toEqual({
                id: 2,
                code: '1',
                description: 'Room 1',
                capacity: '/'
            });
        });
        httpBackend.flush();
    });

});
