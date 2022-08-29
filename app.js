const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const User = require('./models/User');

// importing routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

// connecting to MongoDB using Mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  // const user = new User({
  //   handle: 'Jim',
  //   email: 'jim@jim.jim',
  //   password: "jimisgreat123"
  // })
  // user.save()
  res.send("Hello World")}
  );
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// parsing JSON using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);