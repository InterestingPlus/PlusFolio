import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authenticated. No session found." });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-fallback-jwt-secret-key-32chars",
    );

    req.user = decoded; // { id, email }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired session token." });
  }
};
