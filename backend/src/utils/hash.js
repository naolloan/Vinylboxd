const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

exports.hashPassword = async (plain) => bcrypt.hash(plain, SALT_ROUNDS);
exports.comparePassword = async (plain, hashed) => bcrypt.compare(plain, hashed);
