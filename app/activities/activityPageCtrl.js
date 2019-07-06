app.controller("activityPageCtrl", function (activitiesSrv, $scope, $log, $routeParams) {

    // activitiesSrv.getActivities().then(function (activities) {
    //     $scope.activities = activities;
    // }, function (err) {
    //     $log.error(err);
    // });

    activitiesSrv.getActivityById($routeParams.id).then(function(activity) {
        $scope.activity = activity;
    }, function (err) {
        $log.error(err);
    });

   
    $scope.isFavorite = false; 
    $scope.markAs = function() {
        if ($scope.isFavorite === false){
            $scope.isFavorite = true;
            // activitiesSrv.getUserFavorites($scope.activity);
            // $log.info(JSON.stringify(userFavorites));
        } else {
            $scope.isFavorite = false;
        }
    }

})