app.controller("signupCtrl", function ($scope, userSrv, $log) {

    $scope.userName ="";
    $scope.fname = "";
    $scope.lname = "";
    $scope.email = "";
    $scope.youthMovement = "";

    $scope.signup = function() {
        userSrv.addUser($scope.userName, $scope.fname, $scope.lname, $scope.email, $scope.youthMovement).then(function(newUser) {
             $log.info("new user added: " + JSON.stringify(newUser));

        });

    }
})