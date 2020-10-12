const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const port = 8080;

const fs = require("fs");
const Papa = require("papaparse");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api", routes);

const csvFilePath = "/src/pace.csv";

// Function to read csv which returns a promise so you can do async / await.
let item = [];
const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      step: (row) => {
        item.push(row.data);
        //console.log(row);
      },
      complete: (results) => {
        // console.log("Complete", results.data.length, "records.");
        resolve(results.data);
      },
    });
  });
};

const test = async () => {
  const pData = await readCSV(csvFilePath);
  console.log(pData);
};

test();
//var myJSON = JSON.stringify(arr);
console.log(item);
app.get("/", (req, res) => {
  res.send("result is " + item);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = {
  app,
};
