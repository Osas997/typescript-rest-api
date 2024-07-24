import express from "express";
import { UserController } from "../controller/user-controller";

export const userRoute = express.Router();

userRoute.post("/logout", UserController.logout);
userRoute.get("/me", UserController.me);
