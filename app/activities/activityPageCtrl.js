app.controller("activityPageCtrl", function (activitiesSrv, $scope, $log, $routeParams, userSrv) {


    activitiesSrv.getActivityById($routeParams.id).then(function (activity) {
        $scope.activity = activity;
    }, function (err) {
        $log.error(err);
    });



    $scope.userFav = activitiesSrv.userFav($routeParams.id);
    // $scope.userFavArray = userSrv.getActiveUser().favorites; 
    // $scope.userFav = function (){
    //     if ($scope.userFavArray.includes($scope.activity.activityId)) {
    //         return true;
    //     } else {
    //         return false;
    //     }

    // }

    $scope.markAs = function () {
        activitiesSrv.markAs($routeParams.id);
        $scope.userFav = activitiesSrv.userFav($routeParams.id);
        // activitiesSrv.userFav(actId);
    };

    //     if ($scope.userFavArray.includes($scope.activity.activityId)) {
    //         $scope.userFavArray.splice( $scope.userFavArray.indexOf($scope.activity.activityId),1);
    //     } else {
    //         $scope.userFavArray.push($scope.activity.activityId);
    //     }
    // }

})