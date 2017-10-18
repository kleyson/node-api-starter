const moment = require('moment');
const jwt = require('jwt-simple');

const secret = process.env.SECRET || 'MyS3cr3t';

function generateToken(user) {
  return jwt.encode(
    {
      sub: user.id,
      iat: new Date().getTime(),
      exp: moment()
        .add(1, 'hours')
        .unix(),
    },
    secret,
  );
}

module.exports = { generateToken, secret };
