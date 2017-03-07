(function (angular) {
	'use strict';
	var todoapp = angular.module("todoapp", []);
	todoapp.controller('todoCtr', ['$scope', '$window', function($scope, $window){
		$scope.entryList = [];
		$scope.entry = {
			id: 0,
			status: false,
			content: "",
			editContent: "",
			categroy: ""
		}
		$scope.addEntry = function(event) {
			if (event.keyCode == 13 || event.keyCode == 108) {
				if(!$scope.inputIn) {
					return;
				}
				let newEntry = angular.copy($scope.entry);
				newEntry.id = $scope.entryList.length;
				// newEntry.content = $scope.inputIn;
				newEntry.content = $scope.inputIn;
				$scope.entryList.unshift(newEntry);
				$scope.inputIn = "";
			}
		};
		$scope.deleteEntry = function(entry) {
			// $scope.entryList.splice(entry.id, 1);
			// 这里有一个问题，因为删除对应id后，数组发生变化，此时剩下的entry的id与其实际所处的位置不再对应
			$scope.entryList.splice($scope.entryList.indexOf(entry), 1);
		};
		$scope.deleteAllCompleted = function() {
			for(let i = 0; i < $scope.entryList.length; i++) {
				if($scope.entryList[i].status === true) {
					$scope.entryList.splice(i--, 1);
				}
			}
		}
		$scope.editEntry = function(editContent, entry, event) {
			let i = $scope.entryList.indexOf(entry);
			if (event.keyCode == 13 || event.keyCode == 108) {
				$scope.entryList[i].content = editContent;
				return false;
			}
			if (event.keyCode == 27) {
				$scope.entryList[i].editContent = $scope.entryList[i].content;
				return false;
			}
			return true;
		}
		$scope.pattern = {};

		//由于路由的bug不得不使用原生方式实现
		// console.log($scope.$on);
		// $scope.$on('$routeChangeSuccess', function() {
		// 	console.log($route.current.params);
		// });
		$scope.routeHash = "#/";
		function handelHashChange() {
			if($window.location.hash === "#/") {
				$scope.pattern = {};
				$scope.routeHash = "#/";
			}else if($window.location.hash === "#/active"){
				$scope.pattern = {
					status: false
				};
				$scope.routeHash = "#/active";
			}else if($window.location.hash === "#/completed") {
				$scope.pattern = {
					status: true
				};
				$scope.routeHash = "#/completed";
			}else {
				$scope.pattern = {};
				$window.location.href = "#/";
				$scope.routeHash = "#/";
			}

			// $scope.$digest();
		}
		$window.addEventListener('hashchange', function() {
			handelHashChange();
			$scope.$apply();
			//$scope.$digest();
		});
	}]);
	todoapp.directive("hasFocus", function($timeout) {
		return function(scope, elem, attrs) {
			scope.$watch(attrs.hasFocus, function(newVal) {
				if(newVal) {
					$timeout(function() {
						elem[0].focus();
					}, 0);
				}
			});
		};
	});
	//由于angularJS1.6.1的bug，其路由在hash请求时候，url地址总是出现意料之外的值
	// todoapp.config(function($routeProvider) {
	// 	var routeConfig = {
	// 		controller: "todoCtr",
	// 		templateUrl: "../temp.html",
	// 	}
	// 	$routeProvider
	// 		.when('#/', routeConfig)
	// 		.when('#/:status', routeConfig)
	// 		.otherwise({
	// 			redirectTo:"#/"
	// 		})
	// })

	//使用原生方法实现路由
})(angular);
