import express from "express";
import bodyParser from "body-parser";

const app = express();

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/userController")(app);
require("./controllers/addressController")(app);

app.get("/", async (req, res) => {
  return res.send("Well done!");
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
