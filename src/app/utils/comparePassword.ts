import bcrypt from "bcrypt";

const comparePassword = async (plainText: string, hashPassword: string) => {
  const isPasswordMatched = await bcrypt.compare(plainText, hashPassword);

  return isPasswordMatched;
};
export default comparePassword;
