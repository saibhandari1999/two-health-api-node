const { parentPort } = require("worker_threads");

const dataJSON = require("../dataBase/billsDatabase.json");
const jsonReader = require("../utils/jsonReader")


jsonReader("./dataBase/billsDatabase.json", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    parentPort.postMessage(JSON.stringify(data.ListOfBills));
});

// parentPort.postMessage(listOfBills);