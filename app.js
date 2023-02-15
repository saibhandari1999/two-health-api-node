const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
app.use(express.json());

//Get API 
app.get("/items", async (req, res) => {
  //Multithreading using worker threads
  const worker = new Worker("./taskWorkerFunction/getListOfBillsTask.js");
  worker.on("message", (data) => {
    res.status(200).json(data);
  });
  worker.on("error", (msg) => {
    res.status(404).send(`An error occurred: ${msg}`);
  });
});

app.post("/items", async (req, res) => {
  //Multithreading using worker threads
  const worker = new Worker("./taskWorkerFunction/createNewBillTask.js", { workerData: req.body });
  worker.on("message", (data) => {
    res.status(200).send(data);
  });
  worker.on("error", (msg) => {
    res.status(404).send(`An error occurred: ${msg}`);
  });
});

module.exports = app;