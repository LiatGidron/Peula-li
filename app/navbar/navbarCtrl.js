app.controller("navbarCtrl", function($scope, userSrv, $location) {

    $scope.isLoggedIn = function() {
        return userSrv.isLoggedIn();
    }
    $scope.logout = function() {
        userSrv.logout();
        $location.path("/");
    }
    $scope.getActiveUser = function(){
        return userSrv.getActiveUser(); 
    }
    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
      }
}) 