const request = require('supertest');
const assert = require('chai').assert;
const app = require('../server');

// const expect = chai.expect;

const expect = require('chai').expect;

// testing all routes status
describe('routes status test',function(){

	it('GET / status', function(done){
		request(app)
		.get('/')
		.expect(200)
		.expect('Content-Type', 'text/html; charset=utf-8')
		.end(done)
	});

	// Should return 404 error
	it('GET / bad_path status', function(done){
		request(app)
		.get('/bad_path')
		.expect(404)
		.expect('Content-Type', 'text/html; charset=utf-8')
		.end(done)
	});

	it('GET /signup status', function(done){
		request(app)
		.get('/signup')
		.expect(200)
		.end(done)
	});

    it('GET /signup status', function(done){
        request(app)
            .get('/forgotpassword')
            .expect(200)
            .end(done)
    });


    it('GET /signup status', function(done){
        request(app)
            .get('/changepassword')
            .expect(200)
            .end(done)
    });
});

describe('Sign up form insert into DB', function () {

	let fake_user= {
		fname : 'First name',
		lname: 'last Name',
		email : 'user_email@gmail.com',
		userName : 'testUSer',
        pwd : 'password1',
        "pwd-rpt": 'password1'
	};

    it('should receive user information through POST body', function (done) {
        request(app) .post('/signup') .send(fake_user) .end(function(err, res) {

        	expect(res.statusCode).to.equal(302);
            expect(res.body.fname).to.equal(fake_user.fname);
            expect(res.body.lname).to.equal(fake_user.lname);
            expect(res.body.email).to.equal(fake_user.email);
            expect(res.body.userName).to.equal(fake_user.userName);
            expect(res.body.pwd).to.equal(fake_user.pwd);
            expect(res.body.fname).to.equal(fake_user.fname);
            expect(res.body.pwd-rpt).to.equal(fake_user.pwd-rpt);


            done();
        	});
    	});

    after(function (done) {
        let mysql = require('mysql');

    	const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Ajaypal1',
            database: 'Epsilon',
            insecureAuth: true,
            multipleStatements: true
        });

        let sql = `DELETE FROM User_Accounts WHERE username = '${fake_user.userName}';`;
		connection.query(sql, function (err, results) {
			if (err) throw err;

			done();
        })

    });
});