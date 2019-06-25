app.controller("loginCtrl", function($scope, $location) {

    $scope.invalidLogin = false;
    $scope.email = "";
    $scope.pwd = "";

    $scope.login = function() {
        if ($scope.email === "liat@liat.com" && $scope.pwd === "123") {
            $location.path("/activities");
        } else {
            $scope.invalidLogin = true;
        }
    }
})