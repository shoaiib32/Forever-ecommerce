import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  const name   = process.env.CLOUDINARY_NAME?.trim();
  const key    = process.env.CLOUDINARY_API_KEY?.trim();
  const secret = process.env.CLOUDINARY_SECRET_KEY?.trim();

  console.log("→ configuring Cloudinary with:", name);

  cloudinary.config({
    cloud_name: name,
    api_key:    key,
    api_secret: secret,
  });
};

export default connectCloudinary;
