app.factory("userSrv", function ($q, $http) {
    var activeUser = null;

    function User(plainUser) {
        this.userName = plainUser.userName;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
        this.email = plainUser.email;
        this.youthMovement = plainUser.youthMovement;
    }

    var users = [];
    function addUser(userName, fname, lname, email, pwd, youthMovement) {
        var plainUser = {
            "userName": userName,
            "fname": fname,
            "lname": lname,
            "email": email,
            "pwd": pwd,
            "youthMovement": youthMovement
        }
        var newUser = new User(plainUser);
        users.push(newUser);
        return newUser;
    }

    function isLoggedIn() {
        return activeUser ? true : false;
    }

    // login will check if the user and password exists. If so it will update the active user 
    // variable and will return it
    function login(email, pwd) {
        var async = $q.defer();

        activeUser = null;
        $http.get("app/model/data/users.json").then(function (res) {
            var users = res.data;
            for (var i = 0; i < users.length && !activeUser; i++) {
                if (email === users[i].email && pwd === users[i].pwd) {
                    activeUser = new User(users[i]);
                    async.resolve(activeUser);
                }
            }
            if (!activeUser) {
                async.reject(401);
            }
        }, function (err) {
            async.reject(err);
        })

        return async.promise;
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getActiveUser: getActiveUser,
        addUser: addUser
    }



})