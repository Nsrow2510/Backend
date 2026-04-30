const auth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Login required" });
  }

  next();
};

module.exports = auth;

// const token = req.cookies.token;
// jwt.verify(token, SECRET_KEY);