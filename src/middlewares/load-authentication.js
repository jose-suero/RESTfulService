const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user');

const TOKENSECRET = process.env.RFS_TOKENSECRET;

exports.loadAuthentication = (req, res, next) => {
  const secHeader = req.headers['x-access-token'] || req.headers['authorization'];
  if (secHeader && secHeader.startsWith('Bearer ')) {
    const token = secHeader.slice(7, secHeader.length);

    if (token) {
      jwt.verify(token, TOKENSECRET, (err, decoded) => {
        if (err) { 
          return next(err); 
        }

        req.isAuthenticated = true;
        req.decodedToken = decoded;

        loadUser(decoded.sub).then(user => {
          req.user = user;
          return next();
        }).catch(err => {
          return next(err);
        });
      });
    }
  } else {
    if (next) next();
  }
}

async function loadUser(userId) {
  return await UserModel.findOne({ _id: userId });
}