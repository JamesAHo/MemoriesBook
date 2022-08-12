// test/index.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require("../sever");
const agent = chai.request.agent(app);

const should = chai.should();

chai.use(chaiHttp);

describe('site', function () {
  // describe the test 
  it('Should have home page', function (done) {
    // describe what would happen to the test
    
    agent
      .get('/').end(function (err, res) {
        if (err) {
          return done(err);
        }
            res.should.have.status(200)
        return done(); 
        
      });
  });
});