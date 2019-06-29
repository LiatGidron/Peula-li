var app = angular.module("peulaLiApp", ["ngRoute", "ngAnimate", "ngTouch", "ui.bootstrap"]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "app/home/home.html",
        controller: "homeCtrl"
    }).when ("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when ("/signup", {
        templateUrl: "app/signup/signup.html",
        controller: "signupCtrl"        
    }).when ("/activities", {
        
    }).when ("/newActivity", {
        
    }).when ("/myActivities", {
        
    })
})