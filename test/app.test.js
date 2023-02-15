const app = require('../app.js');
const chai = require('chai')
const server = require('../server.js')
var mocha = require('mocha');
let { expect, assert } = require('chai')
const fs = require("fs");

var chaiHttp = require('chai-http')
chai.use(chaiHttp);

describe('Get Items API', () => {
  it('General testing', (done) => {
    chai.request(server).get('/items').end((err, res) => {
      if (err) {
        console.log(err)
      }
      expect(res).to.have.status(200);
      expect(res).to.have.property("text");
      done();
    });
  });
  it('Api resonse feild testing', (done) => {
    chai.request(server).get('/items').end((err, res) => {
      if (err) {
        console.log(err)
      }
      expect(res.text).to.contains("billID", "patientName", "patientAddress", "hospitalname", "dateOfService", "billAmount");
      done();
    });
  });

});

describe('Post Items API', () => {
  beforeEach(() => {
    dbProtectionFlag=0
    //dummy objects
    jsonTestObject1 = {
      "patientName": "abc",
      "patientAddress": "xyz",
      "hospitalname": "pqr",
      "dateOfService": "12-07-2023",
      "billAmount": 200
  }
  jsonTestObject2 = {
    "patientName": "",
    "patientAddress": "xyz",
    "hospitalname": "pqr",
    "dateOfService": "12-07-2023",
    "billAmount": 200
}
  })

  afterEach(() => {
    // db object deletion
    if(dbProtectionFlag){
    fs.readFile('./dataBase/billsDatabase.json', function (err, fileData) {
      var fileDataJson = JSON.parse(fileData);
      fileDataJson.ListOfBills.pop();
      fs.writeFile('./dataBase/billsDatabase.json', JSON.stringify(fileDataJson), function (err) {
        if (err) throw err;
      });
    })
}})


  it('General testing', (done) => {
    chai.request(server).post('/items').send(jsonTestObject1).end((err, res) => {
      if (err) {
        console.log(err)
      }
      if(res.status==200){
        dbProtectionFlag=1;
      }
      expect(res).to.have.status(200);
      expect(res).to.have.property("text");
      done();
    });
  });

  it('Api resonse feild testing', (done) => {
    chai.request(server).post('/items').send(jsonTestObject1).end((err, res) => {
      if (err) {
        console.log(err)
      }
      if(res.status==200){
        dbProtectionFlag=1;
      }
      expect(res.text).to.contains('"uploadStatus":"successful"',"billID", "patientName", "patientAddress", "hospitalname", "dateOfService", "billAmount");
      done();
    });
  });

  it('Api resonse testing for empty feild', (done) => {
    chai.request(server).post('/items').send(jsonTestObject2).end((err, res) => {
      if (err) {
        console.log(err)
      }
      if(res.status==200){
        dbProtectionFlag=1;
      }
      expect(res.text).to.contains('{"error":"Missing Information"}');
      done();
      dbProtectionFlag=0
    });
  });
});