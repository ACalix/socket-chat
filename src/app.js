"use strict";

angular.module("chatApp", ["ngRoute"])
	.config(function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "/views/chat-main/index.html",
				controller: "MessageController",
				controllerAs: "MsgCtrl"
			})
			.otherwise({ redirectTo: "/" });
	});