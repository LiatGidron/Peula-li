var app = angular.module("peulaLiApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "app/home/home.html"
    }).when ("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when ("/signup", {
        
    }).when ("/activities", {
        
    }).when ("/newActivity", {
        
    }).when ("/myActivities", {
        
    })
})