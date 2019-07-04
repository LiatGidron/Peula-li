app.controller("needToLoginModalCtrl", function ($scope, $uibModalInstance, $location) {

    $scope.closeModal = function(){
        $uibModalInstance.dismiss();
    }
    $scope.login = function(){
        $location.path("/login");
        $uibModalInstance.dismiss();
    }
    $scope.signup = function(){
        $location.path("/signup");
        $uibModalInstance.dismiss();
    }
})