import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  access_secret: process.env.JWT_ACCESS_SECRET,
  bcrypt_slat_round: process.env.BCRYPT_SOLT_ROUND,
  access_token_expiresIn: process.env.Access_Token_ExpiresIn,
  refresh_token_expiresIn: process.env.Refresh_Token_ExpiresIn,
  reset_password_secret: process.env.REFRESH_TOKEN_SECRET,
  reset_expires_in: process.env.RESET_EXPIRES_IN,
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  gmail_app_pass: process.env.GMAIL_APP_PASSWORD,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret_key: process.env.CLOUDINARY_SECRET_KEY,
};
