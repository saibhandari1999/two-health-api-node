const app = require('../app.js');
const chai =require('chai')
const server =require('../server.js')
var mocha = require('mocha');
let {expect,assert} =require('chai')

var chaiHttp=require('chai-http')
chai.use(chaiHttp);

describe('Get Items API',()=>{
  it('General testing', (done)=>{
    chai.request(server).get('/items').end((err,res)=>{
      if (err){
        console.log(err)
      }
      expect(res).to.have.status(200);
      expect(res).to.have.property("text");
      expect(res.text).to.contains("billID","patientName","patientAddress","hospitalname","dateOfService","billAmount");
      done();
    });
  });
  
});