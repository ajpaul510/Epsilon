const request = require('supertest');
const assert = require('assert');
let app = require('../server');



// testing all routes status
describe('routes status',function(){

	// should return 200
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
	// Should return 200
	// it('GET /signup status', function(done){
	// 	request(app)
	// 	.get('/signup')
	// 	.expect(200)
	// 	.end(done)
	// });
});
