let jwt      = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {

  let token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401)
                  .send({success: false, message: "No Token Provided."})
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401)
              .send({success: false, message: " Auth token is not supplied."})
  }
};

module.exports = {
  checkToken: checkToken
};
