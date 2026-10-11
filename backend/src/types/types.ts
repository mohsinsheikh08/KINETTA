import { Request } from "express";

export interface AuthReports extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface UploadResult {
  provider: "imagekit" | "cloudinary" | "mixed";
  urls: string[]
}
