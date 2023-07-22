import bcrypt from "bcrypt";

export const encryptPassword = (password: string) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    return encryptedPassword;
  } catch (error) {
    throw new Error(error);
  }
};
