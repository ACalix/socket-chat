
var guests = function(){
	var main = this;
	this.connectedUsers = [];

	this.addGuest = function(id){
		main.connectedUsers.push(id);
		return main.connectedUsers;
	};

	this.removeGuest = function(id){
		var location = main.connectedUsers.indexOf(id);
		main.connectedUsers.splice(location, 1);
		return main.connectedUsers;
	};
};

module.exports = new guests();
