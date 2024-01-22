const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(403).json({ message: "Ruhsat yo'q" });
    }
  } else res.status(403).json({ message: "Ruhsat yo'q" });
};

module.exports = { checkAuth };
