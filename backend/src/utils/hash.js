import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const hashPassword = async (plain) => bcrypt.hash(plain, SALT_ROUNDS);
export const comparePassword = async (plain, hashed) => bcrypt.compare(plain, hashed);
