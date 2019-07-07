app.controller("activityPageCtrl", function (activitiesSrv, $scope, $log, $routeParams, userSrv) {


    activitiesSrv.getActivityById($routeParams.id).then(function (activity) {
        $scope.activity = activity;
    }, function (err) {
        $log.error(err);
    });


    $scope.userFav = userSrv.userFav($routeParams.id);


    $scope.markAs = function () {
        userSrv.markAs($routeParams.id);
        $scope.userFav = userSrv.userFav($routeParams.id);
    };

})