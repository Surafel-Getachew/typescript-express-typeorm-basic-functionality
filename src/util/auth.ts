import bcrypt from "bcryptjs";

const SALT_ROUNDS: number = 12;

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const checkPassword =  (
  passwordHash: string,
  password: string
): boolean => {
  return bcrypt.compareSync(password, passwordHash);
};
