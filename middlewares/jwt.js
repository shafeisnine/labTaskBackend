// const jwt = require('express-jwt');
// const secret = process.env.JWT_SECRET;

// const authenticate = jwt({
//   secret: secret,
// });

// module.exports = authenticate;

const jwt = require('jsonwebtoken');
const config = require('../config');
const apiResponse = require('../helpers/apiResponse');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return apiResponse.tokenMissingResponse(res, 'No token provided!');
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return apiResponse.unauthorizedResponse(res, 'Unauthorized!');
    }
    req.userId = decoded._id;
    req.firstName = decoded.firstName;
    req.lastName = decoded.lastName;
    req.fullName = `${decoded.firstName} ${decoded.lastName}`;
    next();
  });
};

module.exports = verifyToken;
