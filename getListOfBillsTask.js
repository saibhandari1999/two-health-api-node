const { parentPort } = require("worker_threads");

const dataJSON = require("./billsDatabase.json");
const jsonReader = require("./jsonReader")


jsonReader("./billsDatabase.json", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    parentPort.postMessage(JSON.stringify(data.ListOfBills));
});

// parentPort.postMessage(listOfBills);