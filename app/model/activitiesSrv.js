app.factory("activitiesSrv", function ($q, $http, userSrv) {

    var activities = [];
    var wasEverLoadedFromJSON = false;
    var nextActivityId;

    function Activity(act) {
        this.activityId = act.activityId;
        this.createdBy = act.createdBy;
        this.createDate = act.createDate
        this.activityName = act.activityName;
        this.activityAge = act.activityAge;
        this.activityLength = act.activityLength;
        this.activityLocation = act.activityLocation;
        this.levelOfActive = act.levelOfActive;
        this.activityGoals = act.activityGoals;
        this.activityShortDesc = act.activityShortDesc;
        this.activityFullDesc = act.activityFullDesc;
        this.activityResources = act.activityResources;
        this.activityExtFiles = act.activityExtFiles;
        this.activityGeoLocation = act.activityGeoLocation;
        this.activityTags = act.activityTags;
        this.activityRank = act.activityRank;
        this.youthMovement = act.youthMovement;
    }

    Activity.prototype.rankAvrg = function () {
        var ranks = this.activityRank;
        var sum = 0;
        for (var j = 0; j < ranks.length; j++) {
            sum += ranks[j];
        }
        actAverageRank = sum / ranks.length;
        if (actAverageRank > 0) {
            return actAverageRank;
        }
        else {
            return 0;
        }
    };


    function getActivities() {
        var async = $q.defer();
        if (wasEverLoadedFromJSON) {
            async.resolve(activities);
        } else {
            wasEverLoadedFromJSON = true;
            $http.get("app/model/data/activities.json").then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    var activity = new Activity(res.data[i]);
                    activities.push(activity);
                }
                nextActivityId = res.data.length;
                async.resolve(activities);
            }, function (err) {
                wasEverLoadedFromJSON = false;
                async.reject(err);
            });

        }
        return async.promise;
    }

    function addNewActivity(activityName, activityAge, activityLength, activityLocation, levelOfActive, activityGoals,
        activityShortDesc, activityFullDesc, activityResources, activityExtFiles, activityTags, activityRank) {
        var async = $q.defer();
        var activeUserName = userSrv.getActiveUser().userName;
        var userYouthMovement = userSrv.getActiveUser().youthMovement;
        var plainActivity = {
            "activityId": nextActivityId,
            "createdBy": activeUserName,
            "activityName": activityName,
            "activityAge": activityAge,
            "activityLength": activityLength,
            "activityLocation": activityLocation,
            "levelOfActive": parseInt(levelOfActive),
            "activityGoals": activityGoals,
            "activityShortDesc": activityShortDesc,
            "activityFullDesc": activityFullDesc,
            "activityResources": activityResources,
            "activityExtFiles": activityExtFiles,
            "activityTags": activityTags.split(','),
            "youthMovement": userYouthMovement,
            "activityRank": activityRank
        }
        var newActivity = new Activity(plainActivity);
        activities.push(newActivity);
        ++nextActivityId;
        async.resolve(newActivity);
        return async.promise;
    }

    function getActivityById(activityId) {
        var async = $q.defer();
        getActivities().then(function (activities) {
            for (var i = 0; i < activities.length; i++) {
                if (activities[i].activityId == activityId) {
                    async.resolve(activities[i]);
                }
            }
        }, function (err) {
            async.reject(err);
        })
        return async.promise;
    }

    function getUserActivities() {
        var async = $q.defer();
        var activeUserName = userSrv.getActiveUser().userName;
        var userActivities = [];
        getActivities().then(function (activities) {
            for (var i = 0; i < activities.length; i++) {
                if (activities[i].createdBy == activeUserName) {
                    userActivities.push(activities[i])
                }
            }
            async.resolve(userActivities);
        }, function (err) {
            async.reject(err);
        })
        return async.promise;
    }

    function getUserFavAct() {
        var async = $q.defer();
        var userFavArray = userSrv.getActiveUser().favorites;
        var userFavActivities = [];
        getActivities().then(function (activities) {
            for (var j = 0; j < userFavArray.length; j++) {
                for (var i = 0; i < activities.length; i++) {
                    if (activities[i].activityId === userFavArray[j]) {
                        userFavActivities.push(activities[i]);
                    }
                }
            }
            async.resolve(userFavActivities);
        }, function (err) {
            async.reject(err);
        })
        return async.promise;
    }

    function updateRank(activityId, rank) {
        var async = $q.defer();
        getActivityById(activityId).then(function (activity){
            var ranks = activity.activityRank;
            ranks.push(rank);
            async.resolve(activity.rankAvrg());  
        }, function (err) {
            async.reject(err);
        })
        return async.promise;
    }

    return {
        getActivities: getActivities,
        addNewActivity: addNewActivity,
        getActivityById: getActivityById,
        getUserActivities: getUserActivities,
        getUserFavAct: getUserFavAct,
        updateRank:updateRank
    }
})
