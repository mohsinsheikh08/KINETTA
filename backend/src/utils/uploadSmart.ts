import uploadToImageKit from "./uploadImagekit";
import uploadToCloudinary from "./uploadCloudinary";
import { UploadResult } from "../types/types";

const uploadSmart = async (
  files: Express.Multer.File[],
  folderName: string = "kinetta/product",
): Promise<UploadResult> => {
  const urls: string[] = [];
  let provider: "imagekit" | "cloudinary" | "mixed" = "imagekit";
  const images = files.filter((file) => file.mimetype.startsWith("image/"));
  const videos = files.filter((file) => file.mimetype.startsWith("video/"));

  if (images.length > 0) {
    try {
      const imagekitUrls = await uploadToImageKit(images, folderName);
      urls.push(...imagekitUrls);
      provider = "imagekit";
    } catch (err) {
      const cloudinaryUrls = await uploadToCloudinary(images, folderName);
      urls.push(...cloudinaryUrls);
      provider = "cloudinary";
    }
  }

  if (videos.length > 0) {
    try {
      const cloudinaryUrls = await uploadToCloudinary(videos, folderName);
      urls.push(...cloudinaryUrls);
      provider = images.length > 0 ? "mixed" : "cloudinary";
    } catch (err) {
      const imagekitUrls = await uploadToImageKit(videos, folderName);
      urls.push(...imagekitUrls);
      provider = images.length > 0 ? "mixed" : "imagekit";
    }
  }

  if (urls.length === 0) throw new Error("No files uploaded!");

  return { provider, urls };
};
export default uploadSmart;
