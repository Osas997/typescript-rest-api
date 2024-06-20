import express from "express";
import { UserController } from "../controller/user-controller";

export const publicRoute = express.Router();

publicRoute.post("/register", UserController.register);
publicRoute.post("/login", UserController.login);