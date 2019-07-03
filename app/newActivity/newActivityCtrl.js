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
    $scope.activityResources = ""; 
    $scope.extFiles = "";
    $scope.activityTags = ""; 
    $scope.step1Length = "";
    $scope.step2Length = "";
    $scope.step1Desc = "";
    $scope.step2Desc = "";
    
    

    $scope.addActivity = function() {
        // $scope.fullDesc = function(step1Length,step1Desc, step2Length,step2Desc){
        //     return [{step1Length, step1Desc }, {step2Length, step2Desc}];
        // }
        activitiesSrv.addNewActivity($scope.activityName, $scope.activityAge, $scope.activityLength, $scope.activityLocation, $scope.levelOfActive, $scope.activityGoals,
        $scope.shortDesc, $scope.fullDesc, $scope.activityResources, $scope.extFiles, $scope.activityTags).then(function(newActivity){
            $log.info("new activity added: " + JSON.stringify(newActivity));
            $location.path("/activities");
        })
        
    }
  
})