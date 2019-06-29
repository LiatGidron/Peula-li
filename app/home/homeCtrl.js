app.controller("homeCtrl", function($scope, activitiesSrv) {

    $scope.getActivities = function(){
        return activitiesSrv.getActivities(); 
    }
})