const express = require("express");
const app = express();
const port = 8080;
const fs = require("fs");
const Papa = require("papaparse");

var path = require("./utils/index.js");
let item = [];

const readCSV = async (csvfile) => {
  const csvFile = fs.readFileSync(csvfile);
  const csvData = csvFile.toString();
  new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      step: (row) => {
        item.push(row.data);
      },
    });
  });
  return item;
};

var paceC;
const test = async (csvfile) => {
  const pData = await readCSV(csvfile);
  console.log(pData);
  paceC = pData;
  return pData;
};

var paceJson = test(path.paceCSV);

console.log(item);
app.get("/pace", (req, res) => {
  res.send("result is " + JSON.stringify(item));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = {
  app,
};
