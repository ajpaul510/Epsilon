/*

	All database stuff goes here

*/

let mysql = require('mysql');

const saltRounds = 10;


// init DB
const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'Ajaypal1',
		database: 'Epsilon',
		insecureAuth: true,
		multipleStatements: true
});


function insert(account, info){

    const insert_account = 'INSERT INTO User_Accounts SET ?;';
    const select_userid = 'SELECT * FROM User_Accounts WHERE username = ?;';
    const insert_info = 'INSERT INTO User_Info SET ?;';


    connection.query(insert_account, account, function(err, results){
            if (err) throw err;
    });

    connection.query(select_userid, account.username, function(err, results){
        if (err) throw err;
        else {
            info.user_id = results[0].user_id;

            connection.query(insert_info, info, function(err, results){
                if (err) throw err;
            });
            }
        });
}

//retrieve password for user
function get_password(username, email, callback){
	let sql = 'SELECT user_id FROM User_Info WHERE email = ?;';
	let sql2 = 'SELECT password FROM User_Accounts WHERE user_id = ? AND username = ?;';

	connection.query(sql, email, function(err, results){
		if (err) throw err;
		if (results.length === 0) { //if no match
			callback(false, null, false);
		}
		else{
			connection.query(sql2, [results[0].user_id, username], function(err, results){
				if (err) throw err;
				if (results.length === 0) {
					callback(false, null, false);
				}
				else{
					callback(true, results[0].password, false);
				}
			});
		}
	});
}

// If username is inside database
function check_user(username, callback){
	let sql = `SELECT username FROM User_Accounts WHERE username = '${username}';`;

    connection.query(sql, function (err, results){
        if (err) throw err;
        callback(results, false);
    });

}
function get_last_insert(callback) {
    let sql = `SELECT MAX(user_id) AS user_id FROM User_Accounts;`; // get last user_id

    connection.query(sql, function (err, results) {
        if (err) throw err;
        callback(false, results);
    })
}

function get_id_by_username(username, callback){
    let sql = `SELECT user_id FROM User_Accounts WHERE username = '${username}';`;

    connection.query(sql, function (err, results) {
        if (err) throw err;
        callback(false, results);
    })
}
function get_username_by_id(user_id, callback) {
    let sql = `SELECT username FROM User_Accounts WHERE user_id = ${user_id};`;
    connection.query(sql, function (err, results) {
        if (err) throw err;

        callback(false, results)
    })

}

function insert_into_user_post(user_id, image_path, caption, callback) {
    let sql = `INSERT into User_Posts (user_id, image_path, caption) VALUES('${user_id}', '${image_path}', '${caption}');`;
    connection.query(sql, function (err) {
        if (err) throw err;

        callback(false); // insert worked
    });
}
function check_password(username, password, callback){

    let sql = `SELECT password FROM User_Accounts WHERE username = '${username}';`;

    connection.query(sql, function (error, results) {
        if (error) throw error;
				let isMatch = false;
				if (results[0].password === password){
					isMatch = true;
				}
        callback(isMatch, false);
    });

}

/*
    Get_user_pictures will only get the pictures uploaded by that user themselves

    SQL QUERY RESULT:

        [ RowDataPacket { image_path: 'user_images/screen.png' },
          RowDataPacket { image_path: 'user_images/operator.png' } ]
*/
function get_user_pictures(user_id, callback){
    let sql = `SELECT image_path, caption FROM User_Posts WHERE user_id = ${user_id} ORDER BY time_stamp DESC;`;
    connection.query(sql, function (err, results) {
        if (err) throw err;
        callback(null, results)
    })
}
function get_all_images(callback){
    let sql = `SELECT user_id, image_path, caption From User_Posts ORDER BY time_stamp desc;`
    connection.query(sql, function (err, results) {
        if (err) throw err;

        callback(false, results)
    })
}

module.exports.get_all_images = get_all_images;
module.exports.get_username_by_id = get_username_by_id;
module.exports.get_user_pictures = get_user_pictures;
module.exports.insert_into_user_post = insert_into_user_post;
module.exports.get_password = get_password;
module.exports.get_id_by_username = get_id_by_username;
module.exports.get_last_insert = get_last_insert;
module.exports.check_user = check_user;
module.exports.check_password = check_password;
module.exports.insert = insert;
