import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "User unauthorized.", error_code: 3 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ error: "User unauthorized.", error_code: 4 });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ error: "User unauthorized.", error_code: 4 });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error.", error_code: 2 });
  }
};

export default protectRoute;
