var mysql = require('mysql');
var connectionPool = new Array();
var connectionPoolSize = 10;

function connect() {
	connection = mysql.createConnection({
		host : 'root.ckyhgubsrqq0.us-east-1.rds.amazonaws.com',
		user : 'root',
		password : '12345678',
		port : '3306',
		database : 'amazonstore'
	});
}
connect();
//createConnection();

function createConnection() {
	for (var i = 0; i < connectionPoolSize; i++) {
		var connection = mysql.createConnection({
			host : 'root.ckyhgubsrqq0.us-east-1.rds.amazonaws.com',
			user : 'root',
			password : '12345678',
			port : '3306',
			database : 'amazonstore'
		});
		connectionPool.push(connection);
	}
}

function getConnection(callBack) {
	if (connectionPool.length == 0) {
		while(connectionPool.length > 0){
			callBack();
		}
	} else {
		connection = connectionPool.pop();
	}
	return connection;
}

function returnConnection(connection) {
	console.log("return Connection");
	connectionPool.push(connection);
	console.log("connectionPool length " + connectionPool.length);
}

function executeQuery(sql, callBack) {
	//var connection = getConnection(function(){
		connection.query(sql,callBack);
	//	returnConnection(connection);
	//});
}

exports.connect = connect;
exports.executeQuery = executeQuery;
