/*

	All database stuff goes here

*/

var bcrypt = require('bcrypt');
var mysql = require('mysql');

const saltRounds = 10;

"use strict"

class Database {

	constructor() {

		// init DB
		this.connection = mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'Ajaypal1',
				database: 'Epsilon',
				insecureAuth: true
			});

		// Test connection to database
		this.connection.connect(function(error){

			if (error) {
				console.log('ERROR now database called website found!');
			}else{
				console.log('Database is running on localhost port : 3360');
			}
		});

	}

	generateHash(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
	};


	insert(account, info){

		account.password = this.generateHash(account.password)

		var select_sql = `SELECT user_id FROM User_Accounts WHERE username = '${account.username}';`;
		var insert_sql = `INSERT INTO User_Accounts SET ?`account


		this.connection.query(sql, function(err, result){
			if (err) throw err;
			info.user_id = result;
		});


		// this.connection.query(`INSERT INTO User_Accounts SET ?`, account, function(err, result){
		// 	if (err) throw err;
		// 	console.log(result);
		// });

		// this.connection.query(`INSERT INTO User_Info SET ?`, info, function(err, result){
		// 	if (err) throw err;
		// 	console.log(result);
		// });
	};

	check_password(password){
		return bcrypt.compareSync(password, hash);
	};

};
module.exports = Database;
