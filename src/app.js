const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const port = 8080;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("result is " + JSON.stringify(myjson));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = {
  app,
};
