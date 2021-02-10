require("dotenv").config();

// ==========================
//       DEPENDENCIES
// ==========================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user.js");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

// ==========================
//        MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
//    DATABASE CONNECTION
// ==========================
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.once("open", () => {
  console.log("Bingo, Bongo | Connected to Mongo");
});

// ==========================
//  DATABASE ERROR / DISCON.
// ==========================
mongoose.connection.on("error", (err) => {
  console.log(err.message);
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected...");
});

// ==========================
//    CONTROLLER / ROUTES
// ==========================
const bookmarksController = require("./controllers/bookmarks.js");
app.use("/bookmarks", bookmarksController);

app.post("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  // *** translated structure below from similar error-first callback... could need massaging.
  await User.create(req.body, (createdUser) => {
    try {
      res.status(200).json(createdUser);
    } catch (err) {
      res.status(400).json(err);
    }
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ username: user.username }, SECRET);

      res.status(200).json({
        token,
        username,
        authenticated: true,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Listen
app.listen(PORT, () => {
  console.log(`Dude, just use the browser | Listening on port: ${PORT}`);
});
