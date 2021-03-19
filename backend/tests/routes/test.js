process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


describe('POST /login', function() {
    it('saves a new task', function(done) {
      request.post('/login')
        .send({ username: 'user1@gmail.com', password: 'Abc123' })
        .expect(201)
        .end(function(err, res) {
          done(err);
        });
    });
  });