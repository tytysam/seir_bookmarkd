require("dotenv").config();

// ==========================
//       DEPENDENCIES
// ==========================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGODB_URI;

// ==========================
//        MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());

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
//    DATABASE CONNECTION
// ==========================
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Bingo, Bongo | Connected to Mongo");
});

// ==========================
//    CONTROLLER / ROUTES
// ==========================
const bookmarksController = require("./controllers/bookmarks.js");
app.use("/bookmarks", bookmarksController);

// Listen
app.listen(PORT, () => {
  console.log(`Dude, just use the browser | Listening on port: ${PORT}`);
});
