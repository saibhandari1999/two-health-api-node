const { parentPort } = require("worker_threads");

parentPort.on('message',(data)=>{
    console.log(data)
    parentPort.postMessage("worker to main1")
});

parentPort.postMessage("worker to main")