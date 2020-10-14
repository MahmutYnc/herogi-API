const express = require("express");
const app = express();
const port = 8080;
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = {
  app,
};
