const express = require("express");
const app = express();
const ejs = require("ejs");

//view engine setup
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
