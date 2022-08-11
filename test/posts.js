const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const { response } = require('../sever');
const app = require("../sever");
const agent = chai.request.agent(app);

const should = require('chai').should();

chai.use(chaiHttp);

chai.use(chaiHttp);

describe("Posts", function () {
    const newPost = {
        title: "New Post",
        summary: "content"
    };
    it("should create a new post", function (done) {
        agent.get('posts/index').end(function (err, res) {
            if (err) {
                return done(err);
            }
            
            res.should.have.status(200);
            return done();
        })
       
    })
})