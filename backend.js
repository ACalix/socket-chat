"use strict";

var userList = require("./controllers/user-names.js");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('src'));

io.on("connection", function(client){
	console.log("Client connected...");

	client.on("client_message", function(msg){
		var nickname = client.nickname;
		console.log(nickname + ": " + msg);
		client.broadcast.emit("messages", {user: nickname, message: msg});
		client.emit("messages", {user: nickname, message: msg});
	});

	client.on("join", function(name){
		client.nickname = name;
		var users = userList.addGuest(name);
		if (users.idSet){
			client.emit("guest_join", {isValid: users.idSet, allGuests: users.users});
			client.broadcast.emit("guest_join", {isValid: users.idSet, allGuests: users.users});
		} else {
			client.emit("guest_join", {isValid: users.idSet});
			client.nickname = "";
		};
	});

	client.on("disconnect", function(){
		var nickname = client.nickname;
		var users = userList.removeGuest(nickname);
		client.broadcast.emit("usr_disconnect", {guests: users, whoLeft: nickname});
	});
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

http.listen(8080);