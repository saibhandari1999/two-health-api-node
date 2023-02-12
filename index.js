const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/items", async (req,res)=>{
  const worker = new Worker("./getListOfBillsTask.js");
  worker.on("message", (data) => {
    // console.log(data);
    res.status(200).send(data);
  });
  worker.on("error", (msg) => {
    res.status(404).send(`An error occurred: ${msg}`);
  });
});

app.post("/items", async (req,res)=>{
  // console.log(req.body);
  // res.send(req.body)
  const worker = new Worker("./createNewBillTask.js");
  worker.on("message", (data) => {
    worker.postMessage(req.body)
    console.log(data);
    res.status(200).send(data);
  });
  // worker.on("error", (msg) => {
  //   res.status(404).send(`An error occurred: ${msg}`);
  // });
});
  

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
