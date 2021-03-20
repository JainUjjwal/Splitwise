var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;
describe("POST /login", function () {
  it("1. Login Check", function (done) {
    chai
      .request("http://18.144.25.88:3001")
      .post("/login")
      .send({ username: "user1@gmail.com", password: "Abc123" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("2. Login Get Check", function (done) {
    const user = { userId: 1, username: "a@a.com", Fname: "Ujjwal" };
    const req = chai.request("http://18.144.25.88:3001").get("/login");
    req.session = user;
    req.send().end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it("3. Dashboard", function (done) {
    const req = chai.request("http://18.144.25.88:3001").get("/dashboard");
    req.query = { userId: 1, username: "a@a.com" };
    req.send().end(function (err, res) {
      expect(res).to.have.status(252);
      expect(res.body.message).equal("User Info not found");
      done();
    });
  });

  it("4. Profile Info", function (done) {
    const req = chai
      .request("http://18.144.25.88:3001")
      .get("/profile")
      .query({ username: "user1@gmail.com" });
    req.send().end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body[0].userId).equal(17);
      expect(res.body[0].username).equal("user1@gmail.com");
      expect(res.body[0].Fname).equal("Ujjwal Jain");
      expect(res.body[0].phoneNumber).equal("8172389174");
      expect(res.body[0].lang).equal("English");
      expect(res.body[0].currency).equal("USD");

      done();
    });
  });
  it("5. All Transaction Page", function (done) {
    chai
      .request("http://18.144.25.88:3001")
      .post("/history")
      .send({ userId: 28})
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.groupList[0]).equal('Farewell party');
        done();
      });
  });
});
