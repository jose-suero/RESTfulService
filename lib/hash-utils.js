const bcrypt = require('bcrypt');

exports.hashPassword = async (password, rounds = 10) => {
  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

exports.checkPassword = async (password, hash) => {
  const match = bcrypt.compare(password, hash);
  return match;
}