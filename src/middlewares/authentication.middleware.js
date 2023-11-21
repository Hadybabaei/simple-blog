const HttpExceptions = require("../utils/exceptions/http.exceptions");
const { verifyToken } = require("../utils/token");

async function isLogged(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpExceptions(401, "Unauthorized"));
  }
  const splitedToken = bearer.split(" ")[1];
  await verifyToken(splitedToken)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        return next(new HttpExceptions(401, "Unauthorized"));
      }
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = isLogged
