const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return new Promise(
    (resolve, reject) => {
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: '7d',
        }, (error, token) => {
          if (error) reject(error);
          resolve(token);
        },
      );
    },
  );
};
exports.generateToken = async (payload) => {
  let token = null;
  try {
    token = await generateToken(payload);
  } catch (e) {
    ctx.throw(500, e);
  }
  console.log(token);
  return token;
};

