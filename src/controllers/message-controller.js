angular.module("chatApp")
	.controller("MessageController", ["$scope", "socket",
		function($scope, socket){
			var main = this;
			this.userName = "";
			this.currentChat = [];
			this.connectedGuests = [];

			socket.on("connect", function(data){
				do {
					main.userName = prompt("What is your nickname");
				} while (main.userName === "");
				socket.emit("join", main.userName);
			});

			socket.on("messages", function(data){
				main.currentChat.push(data);
			});

			socket.on("usr_disconnect", function(data){
				main.currentChat.push({user: data.whoLeft, message: " has left the chat."});
				main.connectedGuests = data.guests;
			});

			socket.on("guest_join", function(data){
				main.connectedGuests = data;
			});

			$scope.sendMessage = function(){
				if ((main.message !== undefined) && (main.message !== "")){
					socket.emit("client_message", main.message);
					main.message = "";
				};
			};

			$scope.isNotUser = function(id){
				return id !== main.userName;
			};
	}]);