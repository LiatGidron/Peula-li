app.controller("signupCtrl", function ($scope, userSrv, $log, $location) {

    $scope.userName ="";
    $scope.fname = "";
    $scope.lname = "";
    $scope.email = "";
    $scope.pwd = "";
    $scope.youthMovement = "";

    $scope.signup = function() {
        userSrv.addUser($scope.userName, $scope.fname, $scope.lname, $scope.email, $scope.pwd, $scope.youthMovement).then(function(activeUser) {
             $log.info("new user added: " + JSON.stringify(activeUser));
             $location.path("/");
            }, function (err) {
                $log.error(err);
                $scope.invalidLogin = true;
    
        });

    }
})