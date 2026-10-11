import messageModel from "../models/message.model";
import { Response } from "express";
import { AuthReports } from "../types/types";
const getMessage = async (req: AuthReports, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required!",
      });
    }

    if (!userId) {
      return res.status(401).json({
        message: "Please Login First",
      });
    }

    const message = await messageModel
      .find({
        $or: [
          { from: userId, to: id },
          { from: id, to: userId },
        ],
      })
      .sort({ createdAt: 1 })
      .populate("from", "lastName firstName")
      .populate("to", "firstName lastName");

    res.status(200).json({
      message: "Message fetched successfully!",
      chat: message,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const getConversations = async (req: AuthReports, res: Response) => {
  try {
    const conversations = await messageModel.find();

    res.status(409).json({
      message: "chats fetched successfully!",
      conversations: conversations,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

export { getMessage, getConversations };
