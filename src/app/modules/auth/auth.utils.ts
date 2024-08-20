import jwt from "jsonwebtoken";

interface ITokePayload {
  email: string;
}

export const createJWTToken = (
  payload: ITokePayload,
  secret_key: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret_key, { expiresIn });

  return token;
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const isVerified = jwt.verify(token, secret);
    return isVerified;
  } catch (err) {
    throw new Error("You Are not Authorized!!!");
  }
};
