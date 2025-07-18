// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {
  try {
    // ensure req.body exists so we can assign userId to it
    if (!req.body) req.body = {};

    // grab the standard Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token not found" });
    }

    // extract the token string
    const token = authHeader.split(" ")[1];

    // verify it
    const decode = jwt.verify(token, process.env.jwt_SECRET);
    if (!decode || !decode.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // attach userId into req.body exactly as before
    req.body.userId = decode.id;
    next();

  } catch (error) {
    console.error("JWT verification error:", error.name, error.message);
    return res.status(401).json({ success: false, message: "Token verification failed" });
  }
};

export default isAuthorized;
