import bcrypt from "bcrypt";

const hashPassword = async (plainText: string, saltRound: number) => {
  const password = await bcrypt.hash(plainText, saltRound);

  return password;
};
export default hashPassword;
