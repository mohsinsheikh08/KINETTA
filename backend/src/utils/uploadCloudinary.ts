
import cloudinary from "../config/cloudinary";
const uploadToCloudinary = (
  files: Express.Multer.File[],
  folderName: string = "kinetta/product",
): Promise<string[]> => {
  const uploads = files.map((file) => {
    return new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error)
          }
          resolve(result.secure_url)
        },
      );
      stream.end(file.buffer)
    });
  });
  return Promise.all(uploads)
};


export default uploadToCloudinary