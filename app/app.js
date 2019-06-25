var app = angular.module("peulaLiApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "app/home/home.html"
    }).when ("/login", {

    }).when ("/signup", {
        
    }).when ("/activities", {
        
    }).when ("/newActivity", {
        
    }).when ("/myActivities", {
        
    })
})