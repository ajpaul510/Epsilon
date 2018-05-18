/*

	All database stuff goes here


	** Sample connector function below **

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



		// var sql = `INSERT INTO Epsilon VALUES ('${this.first_name}');`; // must use backtick ` for sting varible concat

		// this.connection.query(sql, function (err, result) {
		// 	if (err) throw err;
		// 	console.log("1 record inserted");
		// });

	};
};
module.exports = Database;
