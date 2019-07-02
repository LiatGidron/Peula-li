app.controller("newActivityCtrl", function($scope, userSrv, activitiesSrv, $log, $location) {

    $scope.getActiveUser = function(){
        return userSrv.getActiveUser(); 
    }

    $scope.activityName = ""; 
    $scope.activityAge = ""; 
    $scope.activityLength = ""; 
    $scope.activityLocation = ""; 
    $scope.levelOfActive = ""; 
    $scope.activityGoals = ""; 
    $scope.shortDesc = ""; 
    $scope.fullDesc = ""; 
    $scope.activityResources = ""; 
    $scope.extFiles = "";
    $scope.activityTags = ""; 

    $scope.addActivity = function() {
        activitiesSrv.addNewActivity($scope.activityName, $scope.activityAge, $scope.activityLength, $scope.activityLocation, $scope.levelOfActive, $scope.activityGoals,
        $scope.shortDesc, $scope.fullDesc, $scope.activityResources, $scope.extFiles, $scope.activityTags).then(function(newActivity){
            $log.info("new activity added: " + JSON.stringify(newActivity));
            $location.path("/activities");
        })
    }
  
})