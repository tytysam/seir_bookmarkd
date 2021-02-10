// ==========================
//       DEPENDENCIES
// ==========================
const express = require("express");
const bookmarks = express.Router();
const Bookmark = require("../models/bookmarks.js");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// ==========================
//       AUTHORIZATION
// ==========================

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const payload = await jwt.verify(token, SECRET);
      req.user = payload;
      next();
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(400).json(new Error("No token in header."));
  }
};

// ==========================
//       I.N.D.U.C.E.S.
// ==========================

// Index | GET Request
bookmarks.get("/", async (req, res) => {
  try {
    const foundBookmarks = await Bookmark.find({});
    res.status(200).json(foundBookmarks);
  } catch (err) {
    res.status(400).json(err);
  }
});

// New | GET Request

// Destroy | DELETE Request
bookmarks.delete("/:id", async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBookmark);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update | PUT Request
bookmarks.put("/:id", async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBookmark);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create | POST Request
bookmarks.post("/", async (req, res) => {
  try {
    const createdBookmark = await Bookmark.create(req.body);
    res.status(200).json(createdBookmark);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit | GET Request

// Show | GET Request
bookmarks.get("/:id", async (req, res) => {
  try {
    const foundIndividualBookmark = await Bookmark.findById(req.params.id);
    res.status(200).json(foundIndividualBookmark);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = bookmarks;
