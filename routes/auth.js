const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
//register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  //check if username already exists
  const isexistsuser = await User.findOne({ username: username });
  if (isexistsuser) {
    return res
      .status(409)
      .json("username already exsists!! ☹ choose a better one :P");
  }
  //check if email already exists
  const isexistsemail = await User.findOne({ email: email });
  if (isexistsemail) {
    return res.status(409).json("Email already exsists!! ☹");
  }
  try {
    //generate new password or hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email: email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("wrong password");
    //
    console.log(user._id, user);
    const conversation = await Conversation.find({
      members: { $in: user._id },
    });

    // const data = conversation.map((dat) => dat._id);

    // const totalMessages = await Message.find({
    //   conversationId: { $in: data },
    // });

    console.log("convertion count authline 64", conversation);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.Message);
    res.status(500).json(err);
  }
});

module.exports = router;

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password);

//   try {
//     const user = await User.findOne({ email: email });
//     !user && res.status(404).json("user not found");

//     const validPassword = await bcrypt.compare(password, user.password);
//     !validPassword && res.status(400).json("wrong password");
//     //

//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err.Message);
//     res.status(500).json(err);
//   }
// });

// console.log(user);
// const conversation = await Conversation.find({
//   members: { $in: [user._id] },
// });

// console.log("convertion count", conversation);
// const data = conversation.map((dat) => dat._id);

// const totalMessages = await Message.find({
//   conversationId: { $in: data },
// });
