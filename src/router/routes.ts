import express from "express";
import { publicRoute } from "./public-route";
import { apiRoute } from "./api";

const router = express.Router();

router.use(publicRoute);
router.use(apiRoute);
export default router;
