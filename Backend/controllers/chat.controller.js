import { askGroq } from "../utils/openai.js";
import Thread from "../models/Thread.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const aiChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const answer = await askGroq(prompt);

    res.json({ answer });
  } catch (error) {
    res.status(500).json({
      message: "AI request failed",
      error: error.response?.data || error.message,
    });
  }
};

export const getAllThread = asyncHandler(async (req, res) => {
  let threads;

  if (req.user.role === "admin") {
    threads = await Thread.find().sort({ updatedAt: -1 });
  } else {
    threads = await Thread.find({ user: req.user.id }).sort({
      updatedAt: -1,
    });
  }
  // here .short updated at -1 shows recent update on top
  res.json(threads);
});

export const getThread = asyncHandler(async (req, res) => {
  const { threadId } = req.params;

  const thread = await Thread.findOne({ threadId });

  if (!thread) {
    res.status(404);
    throw new Error("Thread not found");
  }

  res.json(thread.messages);
});

export const deleteThread = asyncHandler(async (req, res) => {
  const { threadId } = req.params;

  const deleteThread = await Thread.findOneAndDelete({ threadId });

  if (!deleteThread) {
    res.status(404);
    throw new Error("Thread not found");
  }
  res.status(200).json({
    success: "chat deleted succefully",
  });
});

export const chat = asyncHandler(async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    res.status(400);
    throw new Error("missing require field");
  }

  let thread = await Thread.findOne({ threadId });

  if (!thread) {
    //create new thread in db
    thread = new Thread({
      threadId,
      user: req.user.id,
      title: message,
      messages: [{ role: "user", content: message }],
    });
  } else {
    thread.messages.push({ role: "user", content: message });
  }

  const assistantReply = await askGroq(message);

  thread.messages.push({ role: "assistant", content: assistantReply });
  thread.updatedAt = new Date();

  await thread.save();

  res.json({ reply: assistantReply });
});
