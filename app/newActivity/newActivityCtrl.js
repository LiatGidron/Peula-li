app.controller("newActivityCtrl", function($scope, userSrv) {

    $scope.getActiveUser = function(){
        return userSrv.getActiveUser(); 
    }
  
})