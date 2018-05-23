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
			port: 3306,
			user: 'root',
			password: 'Ajaypal1',
			database: 'test'
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

	insert(object){

		// Store user entered information in instance variables
		this.first_name = object.fname;
		this.last_name = object.lname;
		this.email = object.email;
		this.user_name = object.usrName;
		this.password = object.pwd;
		this.pwd_rpt = object.pwd_rpt;

		var hashed_password = this.generateHash(this.password);


		var insert_sql = `INSERT INTO Epsilon.User_Accounts VALUES (null,'${this.user_name}','${hashed_password}');`; // must use backtick ` for sting varible concat

		// this.connection.query(insert_sql, function (err, result) {
		// 	if (err) throw err;
		// 	console.log("1 record inserted");
		// });

		var query_sql = `SELECT user_id FROM Epsilon.User_Accounts WHERE username = '${this.user_name}';`;
		this.connection.query(query_sql, function (err, result) {
			if (err) throw err;

			console.log(result);
		});


	};

	check_password(password){
		return bcrypt.compareSync(password, hash);
	};
	// find_username(user_name){

	// };

};
module.exports = Database;
