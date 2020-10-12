var Papa = require("papaparse");
var file = "./utils/pace";

var rows;
Papa.parse(file, {
  complete: function (results) {
    console.log("Finished:", results.data);
    rows = results.data;
  },
});
