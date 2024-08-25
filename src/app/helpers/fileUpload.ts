import multer from "multer";
import path, { resolve } from "path";
import fs from "fs";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import configs from "../configs";

cloudinary.config({
  cloud_name: configs.cloudinary_name,
  api_key: configs.cloudinary_api_key,
  api_secret: configs.cloudinary_secret_key,
});

const sendImageToCloudinary = async (fileName: string, filePath: string) : Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        public_id: fileName,
      },
      function (err, result) {
        if (err) {
          reject(`File Not Uploaded Successfully!!!`);
        } else {
          resolve(result as UploadApiResponse);

          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(`From Unlink`, err);
            } else {
              console.log(`File Uploaded Successfully!!`);
            }
          });
        }
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + "/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const fileName = file.originalname + "_" + uniqueSuffix + extension;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100000,
  },
  fileFilter: (req, file, cb) => {
    const extSupport = /.jpg|.png|.jpeg|.webp|.svg/;

    if (extSupport.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const fileUploadHelper = {
  upload,
  sendImageToCloudinary,
};
