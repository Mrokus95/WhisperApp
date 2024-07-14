import Message from "./../models/message.js";
import User from "./../models/user.js";
import Conversation from "./../models/conversation.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  const { id: recevierId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;
  const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
  let receiver;

  if (isValidObjectId(recevierId)) {
    receiver = await User.findById(recevierId);
    if (!receiver) {
      return res.status(404).json({ error: "There is no user with that ID." });
    }
  } else {
    return res.status(400).json({ error: "It is not a valid id number." });
  }

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiver._id] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiver._id],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId: receiver._id,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    res.status(201).json({ message: "Message created successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error.", error2: error.message });
  }
};
