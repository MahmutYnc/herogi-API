var path = require("../utils/index.js");

var myjson = [];
const csv = require("csvtojson");
let csvToJson = require("convert-csv-to-json");
const Papa = require("papaparse");

let item = [];
function parser(csvfile) {
  const readCSV = async (csvfile) => {
    const csvFile = fs.readFileSync(csvfile);
    const csvData = csvFile.toString();
    return new Promise((resolve) => {
      Papa.parse(csvData, {
        header: true,
        step: (row) => {
          item.push(row.data);
          console.log(row);
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
  return item.data;
}
let pace = parser(path.paceCSV);

module.exports = {
  users: parser(path.usersCSV),
};
