const jwt = require('jsonwebtoken');

const TOKENSECRET = process.env.RFS_TOKENSECRET;
const TOKENISSUER = process.env.RFS_TOKENISSUER;

exports.createToken = async function (sub, payload = {}) {
  const tokenPayload = {
    iss: TOKENISSUER,
    sub,
    ...payload
  }

  return await jwt.sign(
    tokenPayload,
    TOKENSECRET,
    { algorithm: 'HS256', expiresIn: '48h' }
  );
}