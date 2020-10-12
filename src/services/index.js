var path = require("./utils/index.js");

var myjson = [];
const csv = require("csvtojson");
csv()
  .fromFile(path.usersCSV)
  .then((jsonObj) => {
    console.log(jsonObj);
    myjson = jsonObj;
  });
console.log(myjson);
