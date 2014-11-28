angular.module('word', ['ionic'])
.factory('Categories', function () {
    return {
        getLastActiveIndex: function () {
            return parseInt(window.localStorage['lastActiveCategory']) || 0;
        },
        setLastActiveIndex: function (index) {
            window.localStorage['lastActiveCategory'] = index;
        }
    }
})
.controller('WordCtrl', function ($scope, $http, $sce, Categories, $ionicSideMenuDelegate) {

    //$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
    $http.get('data.json').
    success(function (data, status, headers, config) {
        $scope.categories = data;

        $scope.activeCategory = $scope.categories[Categories.getLastActiveIndex()];

        $scope.selectCategory = function (category, index) {
            $scope.activeCategory = category;
            Categories.setLastActiveIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
        };

        $scope.toggleCategories = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.getVideo = function () {
            return $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.activeCategory.video);
        };
    });


});