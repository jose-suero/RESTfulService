const jwt = require('jsonwebtoken');

const TOKENSECRET = process.env.RFS_TOKENSECRET;
const TOKENISSUER = process.env.RFS_TOKENISSUER;

exports.createToken = async function (sub, payload = {}) {
  const tokenPayload = {
    iss: TOKENISSUER,
    exp: Math.floor(Date.now()/100)+(60*60),
    sub,
    ...payload
  }
  
  return await jwt.sign(
    tokenPayload,
    TOKENSECRET
  )
}