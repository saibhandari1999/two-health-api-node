const { workerData, parentPort } = require("worker_threads");
const uuid = require('uuid');
const fs = require("fs");

// empty feild catch
if(workerData.patientName==null||workerData.patientName=="" ||
workerData.patientAddress==null||workerData.patientAddress=="" ||
workerData.hospitalname==null||workerData.hospitalname=="" ||
workerData.dateOfService==null||workerData.dateOfService=="" ||
workerData.billAmount==null||workerData.billAmount=="" ){
    parentPort.postMessage({error:"Missing Information"})
}else{
//Creating new bill json object using api post data through workerdata
const newBill = {
    "billID": uuid.v4(),
    "patientName": workerData.patientName,
    "patientAddress": workerData.patientAddress,
    "hospitalname": workerData.hospitalname,
    "dateOfService": workerData.dateOfService,
    "billAmount": workerData.billAmount,
}

// Inmemory DB updates
    //reading file data
fs.readFile('./dataBase/billsDatabase.json', function (err, fileData) {
    //parsing data
    var fileDataJson = JSON.parse(fileData);
    //getting bill list and adding new bill as element of list
    fileDataJson.ListOfBills.push(newBill);
    try {
        //writing updated list in file
        fs.writeFile('./dataBase/billsDatabase.json', JSON.stringify(fileDataJson), function (err) {
            if (err) throw err;
        });
        parentPort.postMessage({createdBill:newBill,uploadStatus:"successful"});
    } catch (error) {
        parentPort.postMessage({createdBill:newBill,uploadStatus:"unsuccessful"});
    }

})
}
