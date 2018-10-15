angular.module('loginApp',	[
	'spring-security-csrf-token-interceptor'
	])
.controller('LoginCtrl', function($scope, $http) {
	console.log('Loaded Login Controller');

	$scope.vm = {
		submitted: false,
		errorMessage: [],
	};

	$scope.onLogin = function() {
		console.log('Attempting login with username ' + $scope.vm.username + ' and password ' + $scope.vm.password);

		$scope.vm.submitted = true;

		if ($scope.form.$invalid) {
			return;
		}

		$scope.login($scope.vm.userName, $scope.vm.password);

	};

	$scope.preparePostData = function () {
		var username = $scope.vm.username !== undefined ? $scope.vm.username : '';
		var password = $scope.vm.password !== undefined ? $scope.vm.password : '';
		var email = $scope.vm.email !== undefined ? $scope.vm.email : '';

		return 'username=' + username + '&password=' + password + '&email=' + email;
	};

	$scope.login = function (username, password) {
		var postData = $scope.preparePostData();

		$http({
			method: 'POST',
			url: '/auth',
			data: postData,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"X-Login-Ajax-call": 'true'
			}
		})
		.then(function(response) {
			if (response.data == 'ok') {
				window.location.replace('/index.html');
			}
			else {
				$scope.vm.errorMessages = [];
				$scope.vm.errorMessages.push({description: 'Access denied'});
			}
		});
	};

});
