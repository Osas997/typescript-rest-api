import express from "express";
import { userRoute } from "./user-route";
import { publicRoute } from "./public-route";
import { expressjwt } from "express-jwt";
import { isAdmin } from "../middleware/isadmin-middleware";
import { categoryRoute } from "./category-route";
import type { Request as JWTRequest } from "express-jwt";

const router = express.Router();
const secret = process.env.ACCESS_SECRET_KEY!;

router.use(publicRoute);

router.use(expressjwt({ secret: secret, algorithms: ["HS256"] }), userRoute);

router.use(
  expressjwt({ secret: secret, algorithms: ["HS256"] }),
  isAdmin,
  categoryRoute
);

router.get(
  "/me",
  expressjwt({ secret: secret, algorithms: ["HS256"] }),
  (req: JWTRequest, res) => {
    res.send(req.auth);
  }
);

export default router;
