const express = require("express");
const bookmarks = express.Router();
const Bookmark = require("../models/bookmarks.js");

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
