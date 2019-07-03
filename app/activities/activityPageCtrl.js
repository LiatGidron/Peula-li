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

})