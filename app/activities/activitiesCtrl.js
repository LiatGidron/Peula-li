app.controller("activitiesCtrl", function ($scope, activitiesSrv, $log /*,userSrv*/) {

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

    $scope.filterByLength = function(activity){
        if ($scope.length===undefined) {
            return true
        } else if(activity.activityLength === $scope.length) {
            return true;
        } else {
            return false; 
        }
    }
    $scope.filterByLocation = function(activity){
        if ($scope.location===undefined) {
            return true
        } else if(activity.activityLocation===$scope.location) {
            return true;
        } else {
            return false; 
        }
    }
    $scope.ages = [];
    $scope.includeAge = function(age) {
        $scope.ages.push(age); 
    }
   $scope.filterByAge = function(activity) {
    if ($scope.ages=="") {
        return true
    } else if ($scope.ages.indexOf(activity.activityAge)!==-1) {
           return true;
       } else {
           return false;
       }
   }

   $scope.levelsOfActive = [];
   $scope.includeLevelOfActive = function(level) {
       $scope.levelsOfActive.push(level); 
   }
  $scope.filterByLevelOfActive = function(activity) {
   if ($scope.levelsOfActive=="") {
       return true
   } else if ($scope.levelsOfActive.indexOf(activity.levelOfActive)!==-1) {
          return true;
      } else {
          return false;
      }
  }


//   $scope.getYouthmovementOfUser = function(createdBy){
//     var x = userSrv.users.filter(user=>user.userName===createdBy);
//     return x.youthMovement;
// }

})