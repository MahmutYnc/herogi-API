const express = require("express");
const app = express();
const port = 3001;
const fs = require("fs");
const Papa = require("papaparse");

var path = require("./utils/index.js");

const readCSV = (csvfile) => {
  let item = [];
  const csvFile = fs.readFileSync(csvfile);
  const csvData = csvFile.toString();
  new Promise(() => {
    Papa.parse(csvData, {
      header: true,
      step: (row) => {
        item.push(row.data);
      },
    });
  });
  return item;
};

let paceList = readCSV(path.paceCSV);

app.get("/pace", (req, res) => {
  res.json(paceList);
});

let usersList = readCSV(path.usersCSV);

app.get("/users", (req, res) => {
  res.json(usersList);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = usersList.filter((index) => {
    return index.userid == id ? index : null;
  });

  res.send(user);
});

const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

app.get("/allData", (req, res) => {
  res.send($.extend(true, [], usersList, paceList));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

module.exports = {
  app,
};
