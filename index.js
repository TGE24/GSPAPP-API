const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { getSecret } = require("./secrets");
const usersRoute = require("./routes/users");
const courseRoute = require("./routes/courses");
const compression = require("compression");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(getSecret("dbUri"), { useNewUrlParser: true }).then(
  () => {
    console.log("Connected to mongoDB");
  },
  err => console.log("Error connecting to mongoDB", err)
);
app.use(compression());
//sets up the middleware for parsing the bodies and cookies off of the requests
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", usersRoute);
app.use("/api/admin", courseRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };
