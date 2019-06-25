app.controller("loginCtrl", function ($scope, $location, userSrv, $log) {

    $scope.invalidLogin = false;
    $scope.email = "";
    $scope.pwd = "";

    $scope.login = function () {
        userSrv.login($scope.email, $scope.pwd).then(function (activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/");
        }, function (err) {
            $scope.invalidLogin = true;

        });
    }
})