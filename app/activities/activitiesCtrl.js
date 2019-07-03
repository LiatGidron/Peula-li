app.controller("activitiesCtrl", function ($scope, activitiesSrv, $log, userSrv) {

    activitiesSrv.getActivities().then(function (activities) {
        $scope.activities = activities;
    }, function (err) {
        $log.error(err);
    });

    $scope.query = "";
    $scope.filterBySubject = function (activity) {
        if (activity.activityName.includes($scope.query) || activity.activityTags.includes($scope.query)) {
            return true;
        } else {
            return false;
        }
    }

    $scope.filterByLength = function (activity) {
        if ($scope.length === undefined) {
            return true
        } else if (activity.activityLength === $scope.length) {
            return true;
        } else {
            return false;
        }
    }
    $scope.filterByLocation = function (activity) {
        if ($scope.location === undefined) {
            return true
        } else if (activity.activityLocation === $scope.location) {
            return true;
        } else {
            return false;
        }
    }
    $scope.ages = [];
    $scope.includeAge = function (age) {
        if ($scope.ages.indexOf(age) !== -1) {
            $scope.ages.splice($scope.ages.indexOf(age), 1);
        } else {
            $scope.ages.push(age);
        }
    }
    $scope.filterByAge = function (activity) {
        if ($scope.ages == "") {
            return true
        } else if ($scope.ages.indexOf(activity.activityAge) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    $scope.levelsOfActive = [];
    $scope.includeLevelOfActive = function (level) {
        if ($scope.levelsOfActive.indexOf(level) !== -1) {
            $scope.levelsOfActive.splice($scope.levelsOfActive.indexOf(level), 1);
        } else {
            $scope.levelsOfActive.push(level);
        }
    }

    $scope.filterByLevelOfActive = function (activity) {
        if ($scope.levelsOfActive == "") {
            return true
        } else if ($scope.levelsOfActive.indexOf(activity.levelOfActive) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    $scope.filterByYouthMovement = function (activity) {
        if ($scope.youthMovement === undefined) {
            return true
        } else if (activity.youthMovement === $scope.youthMovement) {
            return true;
        } else {
            return false;
        }
    }

    $scope.clearFilter = function () {
        $scope.query = "";
        $scope.length = undefined;
        $scope.location = undefined;
        $scope.ages = [];
        $scope.levelsOfActive = [];
        $scope.youthMovement = undefined;
    };
})