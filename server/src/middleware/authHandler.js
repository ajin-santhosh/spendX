import { verifyAccessToken } from "../utils/token";

export function requireAuth(req, res, next) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      error: "Not logged in",
      //   code:  'NO_TOKEN',
    });
  }

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.sub; // available to all downstream route handlers
    next();
  } catch (err) {
    const expired = err.name === "TokenExpiredError";
    return res.status(401).json({
      error: expired ? "Access token expired" : "Invalid token",
      //   code:  expired ? 'TOKEN_EXPIRED'        : 'TOKEN_INVALID',
    });
  }
}
