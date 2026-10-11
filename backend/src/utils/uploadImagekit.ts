import imagekit from "../config/imagekit";
const uploadToImageKit = async (
  files: Express.Multer.File[],
  folderName: string = "kinetta/product",
): Promise<string[]> => {
  const uploadfile = files.map((file) => {
    return imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: folderName,
    });
  });

  const result = await Promise.all(uploadfile);
  return result.map(
    (result) => `${process.env.URL_ENDPOINT}${result.filePath}`,
  );
};
export default uploadToImageKit;
