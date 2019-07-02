app.factory("activitiesSrv", function ($q, $http, $log) {

    var activities = [];
    var wasEverLoadedFromJSON = false;
    var nextActivityId;

    function Activity(activityId, createdBy, createDate, activityName, activityAge, activityLength, activityLocation,
        levelOfActive, activityGoals, activityShortDesc, activityFullDesc, activityResources, activityExtFiles, activityGeoLocation, activityTags, activityRank) {
        this.activityId = activityId;
        this.createdBy = createdBy;
        this.createDate = createDate
        this.activityName = activityName;
        this.activityAge = activityAge;
        this.activityLength = activityLength;
        this.activityLocation = activityLocation;
        this.levelOfActive = levelOfActive;
        this.activityGoals = activityGoals;
        this.activityShortDesc = activityShortDesc;
        this.activityFullDesc = activityFullDesc;
        this.activityResources = activityResources;
        this.activityExtFiles = activityExtFiles;
        this.activityGeoLocation = activityGeoLocation;
        this.activityTags = activityTags;
        this.activityRank = activityRank;
    }

    function getActivities() {
        var async = $q.defer();
        if (wasEverLoadedFromJSON) {
            async.resolve(activities);
        } else {
            wasEverLoadedFromJSON = true;
            $http.get("app/model/data/activities.json").then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    var activity = new Activity(res.data[i].activityId, res.data[i].createdBy, res.data[i].createDate, res.data[i].activityName,
                        res.data[i].activityAge, res.data[i].activityLength, res.data[i].activityLocation, res.data[i].levelOfActive, res.data[i].activityGoals,
                        res.data[i].activityShortDesc, res.data[i].activityFullDesc, res.data[i].activityResources, res.data[i].activityExtFiles,
                        res.data[i].activityGeoLocation, res.data[i].activityTags, res.data[i].activityRank);
                    activities.push(activity);
                }
                nextActivityId = res.data.length;
                async.resolve(activities);
            }, function (err) {
                wasEverLoadedFromJSON = false;
                async.reject(err);
            });
            return async.promise;
        }
    }

        function addNewActivity(activityName, activityAge, activityLength, activityLocation, levelOfActive, activityGoals,
            activityShortDesc, activityFullDesc, activityResources, activityExtFiles, activityTags) {
            var async = $q.defer();
            var activeUserName = userSrv.getActiveUser().userName;
            var plainActivity = {
                "activityId": nextActivityId,
                "createdBy": activeUserName,
                "activityName": activityName,
                "activityAge": activityAge,
                "activityLength": activityLength,
                "activityLocation": activityLocation,
                "levelOfActive": levelOfActive,
                "activityGoals": activityGoals,
                "activityShortDesc": activityShortDesc,
                "activityFullDesc": activityFullDesc,
                "activityResources": activityResources,
                "activityExtFiles": activityExtFiles,
                "activityTags": activityTags
            }
            var newActivity = new Activity(plainActivity);
            activities.push(newActivity);
            ++nextActivityId;
            async.resolve(newActivity);
            return async.promise;
        }

        return {
            getActivities: getActivities,
            addNewActivity: addNewActivity
        }
    })