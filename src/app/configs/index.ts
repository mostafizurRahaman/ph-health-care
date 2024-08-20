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
};
