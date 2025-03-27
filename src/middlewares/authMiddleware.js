import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const authenticate = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw createHttpError(401, "Unauthorized: No token provided");
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; 

    next();
  } catch (error) {
    next(createHttpError(401, "Unauthorized: Invalid token"));
  }
};
