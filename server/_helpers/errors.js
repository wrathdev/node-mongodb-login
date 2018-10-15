module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom API error
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  if (err.name === "ValidationError") {
    // mongoose db validation error
    return res.status(400).json({ message: err.message });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
