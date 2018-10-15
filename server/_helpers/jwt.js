const config = require("config.json");
const expressJwt = require("express-jwt");
const userService = require("../users/user.service");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // Routes that don't need authentication
      "/users/register",
      "/users/authenticate"
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists in database
  if (!user) {
    return done(null, true);
  }

  done();
}
