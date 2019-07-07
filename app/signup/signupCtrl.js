app.controller("signupCtrl", function ($scope, userSrv, $log, $location) {

    $scope.userName = "";
    $scope.fname = "";
    $scope.lname = "";
    $scope.email = "";
    $scope.pwd = "";
    $scope.youthMovement = "";
    $scope.favorites = [];

    $scope.invalidSignup=false;
    $scope.signup = function () {
        userSrv.doesExist($scope.email, $scope.userName).then(function (x) {
            if (x == "ok") {
                userSrv.addUser($scope.userName, $scope.fname, $scope.lname, $scope.email, $scope.pwd, $scope.youthMovement, $scope.favorites).then(function (activeUser) {
                    $log.info("new user added: " + JSON.stringify(activeUser));
                    $location.path("/");
                });
            } else {
                $scope.invalidSignup = true;
            }
        })
    }
})