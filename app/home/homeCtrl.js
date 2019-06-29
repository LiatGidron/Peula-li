app.controller("homeCtrl", function ($scope, activitiesSrv, $log) {

    activitiesSrv.getActivities().then(function (activities) {
        $scope.activities = activities;
    }, function (err) {
        $log.error(err);
    });
})