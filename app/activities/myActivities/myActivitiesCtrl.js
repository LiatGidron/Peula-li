app.controller("myActivitiesCtrl", function ($scope, activitiesSrv, userSrv, $location) {

    $scope.isLoggedIn = function () {
        return userSrv.isLoggedIn();
    };

    $scope.getActiveUser = function () {
        return userSrv.getActiveUser();
    };



    activitiesSrv.getUserActivities().then(function (userActivities) {
        $scope.activities = userActivities;
    })

    $scope.openModal = function () {
        $uibModal.open({
            templateUrl: "app/activities/modal/needToLoginModal.html",
            controller: "needToLoginModalCtrl"
        });
    }

    $scope.openActivityPage = function (activityId) {
        if ($scope.isLoggedIn() == false) {
            $scope.openModal();
        } else {
            $location.path("/activities/" + activityId);
        }
    }

    activitiesSrv.getUserFavAct().then(function (userFavAct) {
        $scope.userFavAct = userFavAct;
    });
})