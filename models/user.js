/*

	All database stuff goes here

*/

var bcrypt = require('bcrypt');
var mysql = require('mysql');

const saltRounds = 10;

"use strict"

// init DB
connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'Ajaypal1',
		database: 'Epsilon',
		insecureAuth: true
});

connection.connect();

function generateHash(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};


function insert(account, info){

	account.password = generateHash(account.password)

	var select_sql = `SELECT user_id FROM User_Accounts WHERE username = '${account.username}';`;
	var insert_sql = `INSERT INTO User_Accounts SET ${account}`;


	connection.query(select_sql, function(err, result){
		if (err) throw err;
		info.user_id = result;

	});
	console.log(insert_sql)

		// this.connection.query(`INSERT INTO User_Accounts SET ?`, account, function(err, result){
		// 	if (err) throw err;
		// 	console.log(result);
		// });

		// this.connection.query(`INSERT INTO User_Info SET ?`, info, function(err, result){
		// 	if (err) throw err;
		// 	console.log(result);
		// });
};

function compare_passwords(password, hash){
	return bcrypt.compareSync(password, hash);
};

// If username is inside database
function check_user(username, callback){
	var sql = `SELECT username FROM User_Accounts WHERE username = '${username}';`;

	connection.query(sql, function (error, results, fields) {
	if (error) throw error;
		callback(results, false);
	});

};

function check_password(password, callback){
	var sql = `SELECT password FROM User_Accounts WHERE password = '${password}';`;

	connection.query(sql, function (error, results, fields) {

	if (error) throw error;
		var isMatch = compare_passwords(password, results[0].password)
		callback(isMatch, false);
	});

};

module.exports.check_user = check_user;
module.exports.check_password = check_password;
module.exports.insert = insert;
