import Thread from "../models/Thread.js";

export const isOwner = async (req, res, next) => {
  try {
    const thread = await Thread.findOne({threadId:req.params.threadId});
    if (!thread) {
      return res.status(404).json({ message: "thread not found" });
    }
    // this will only run when role != admin , user.id !=req.id
    if (thread.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "you are not allow to do this " });
    }

    req.thread = thread;

    next();
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
