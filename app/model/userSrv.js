app.factory("userSrv", function ($q, $http, $log) {
    var activeUser = null;

    function User(plainUser) {
        this.userName = plainUser.userName;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
        this.email = plainUser.email;
        this.pwd = plainUser.pwd;
        this.youthMovement = plainUser.youthMovement;
        this.favorites = plainUser.favorites;
    }

    var users = [];
    $http.get("app/model/data/users.json").then(function (res) {
        users = res.data;
    });


    function addUser(userName, fname, lname, email, pwd, youthMovement,favorites) {
        var async = $q.defer();
        var plainUser = {
            "userName": userName,
            "fname": fname,
            "lname": lname,
            "email": email,
            "pwd": pwd,
            "youthMovement": youthMovement,
            "favorites":favorites
        }
        var newUser = new User(plainUser);
        users.push(newUser);
        activeUser = newUser;
        async.resolve(activeUser);
        return async.promise;
    }

    function isLoggedIn() {
        return activeUser ? true : false;
    }

    // login will check if the user and password exists. If so it will update the active user 
    // variable and will return it
    function login(email, pwd) {
        var async = $q.defer();
        activeUser = null;
        for (var i = 0; i < users.length && !activeUser; i++) {
            if (email === users[i].email && pwd === users[i].pwd) {
                activeUser = new User(users[i]);
                async.resolve(activeUser);
            }
        }
        if (!activeUser) {
            async.reject(401);
        }
        return async.promise;
    }


    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    function doesExist(email, userName) {
        var async = $q.defer();
        for (var i = 0; i < users.length; i++) {
            if (userName === users[i].userName || email === users[i].email) {
                x = "exist"
                async.resolve(x);
            } else {
                x = "ok"
            } 
        }
        async.resolve(x);
        return async.promise;
    }

    function userFav(activityId) {
        var userFavArray = getActiveUser().favorites;
        if (userFavArray.includes(parseInt(activityId))) {
            return true;
        } else {
            return false;
        }
    }

    function markAs(activityId) {
        var userFavArray = getActiveUser().favorites;
        if (userFavArray.includes(parseInt(activityId))) {
            userFavArray.splice(userFavArray.indexOf(parseInt(activityId)), 1);
            userFav = false;
        } else {
            userFavArray.push(parseInt(activityId));
            $log.info(userFavArray);
            userFav = true;
        }
    }


    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getActiveUser: getActiveUser,
        addUser: addUser,
        users: users,
        doesExist: doesExist,
        userFav:userFav,
        markAs:markAs
    }



})