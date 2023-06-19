const bcrypt = require("bcrypt");

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const genHash = await bcrypt.hash(password, salt);
  return genHash
  
}

async function validPassword(password , hash) {
  const hashVerify = await bcrypt.compare(password, hash);
  return hashVerify;
}

module.exports.genPassword = genPassword,
module.exports.validPassword = validPassword;
