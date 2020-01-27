const express = require("express");
const db = require("./models");

const app = express(); // express를 불러와서 app이라는 객체를 만든다.
db.sequelize.sync();

app.get("/", (req, res) => {
  res.send("Hello Server");
});
app.get("/about", (req, res) => {
  res.send("Hello about");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
