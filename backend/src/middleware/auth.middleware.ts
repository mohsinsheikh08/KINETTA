import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthReports } from "../types/types";
const tokenChecker = (req: AuthReports, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(
      token,
      (process.env.JWT_SECRET as string) || "default_secret",
    ) as { id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authorize = (...alowedMembers: string[]) => {
  return (req: AuthReports, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({
          message: "Unauthorized!",
        });
      }

      if (!alowedMembers.includes(user.role)) {
        return res.status(403).json({
          message: "Access denied!",
        });
      }
      next();
    } catch (err) {
      return res.status(500).json({
        message: "This page can only acess by product manager and super admin!",
        err: err instanceof Error ? err.message : "Unknown Error!",
      });
    }
  };
};

export { tokenChecker, authorize };
