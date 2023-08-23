const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const newComment = new Comment({ ...req.body });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
});

router.get("/:postId", async (req, res, next) => {
  console.log(req.params);
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    console.log(comments);
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
