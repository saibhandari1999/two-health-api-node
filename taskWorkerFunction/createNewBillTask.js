const { workerData, parentPort } = require("worker_threads");
const uuid = require('uuid');
const fs = require("fs");

const newBill = {
    "billID": uuid.v4(),
    "patientName": workerData.patientName,
    "patientAddress": workerData.patientAddress,
    "hospitalname": workerData.hospitalname,
    "dateOfService": workerData.dateOfService,
    "billAmount": workerData.billAmount,
}

fs.readFile('./dataBase/billsDatabase.json', function (err, fileData) {
    var fileDataJson = JSON.parse(fileData);
    fileDataJson.ListOfBills.push(newBill);
    fs.writeFile('./dataBase/billsDatabase.json', JSON.stringify(fileDataJson), function (err) {
        if (err) throw err;
    });
})

parentPort.postMessage(newBill);