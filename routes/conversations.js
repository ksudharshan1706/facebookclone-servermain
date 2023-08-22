const router = require("express").Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/getMessages/:userId", async (req, res) => {
//   // console.log(req.params, req.params.userId);
//   try {
//     const conversation = await Conversation.find({
//       members: { $in: [req.params.userId] },
//     });

//     console.log("convertion count", conversation, req.params.userId);
//     const data = conversation.map((dat) => dat._id);

//     const totalMessages = await Message.find({
//       conversationId: { $in: data },
//     });
//     console.log("line 70", data, totalMessages);
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/getMessages/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/totalMessages", async (req, res) => {
  try {
    const totalMessages = await Message.find({
      conversationId: { $in: req.body.Ids },
    });
    res.status(200).json(totalMessages);
  } catch (err) {
    res.status(500).json(err.Message);
  }
});

module.exports = router;
