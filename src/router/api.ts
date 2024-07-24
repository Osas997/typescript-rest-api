import express from "express";
import { expressjwt } from "express-jwt";
import { authMiddleware } from "../middleware/auth-middleware";
import { userRoute } from "./user-route";
import { categoryRoute } from "./category-route";
import { postRoute } from "./post-route";

export const apiRoute = express.Router();
const secret = process.env.ACCESS_SECRET_KEY!;

apiRoute.use(expressjwt({ secret: secret, algorithms: ["HS256"] }));
apiRoute.use(authMiddleware);

apiRoute.use(userRoute);
apiRoute.use(postRoute);

apiRoute.use(categoryRoute);
