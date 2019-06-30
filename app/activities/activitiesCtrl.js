app.controller("activitiesCtrl", function ($scope, activitiesSrv, $log) {

    activitiesSrv.getActivities().then(function (activities) {
        $scope.activities = activities;
    }, function (err) {
        $log.error(err);
    });
    $scope.query="";
    $scope.filterBySubject = function(activity) {
        if(activity.activityName.includes($scope.query) || activity.activityTags.includes($scope.query)) {
            return true;
        } else {
            return false; 
        }
    }
    $scope.length="";
    $scope.filterByLength = function(activity){
        if(activity.activityLength === $scope.length) {
            return true;
        } else {
            return false; 
        }
    }
   
})