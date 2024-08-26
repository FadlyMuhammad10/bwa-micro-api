import express from "express";
import { UserController } from "../controller/user-controller";
import { ParticipantController } from "../controller/participant-controller";
import { OrderController } from "../controller/order-controller";

export const publicRouter = express.Router();

publicRouter.post("/api/users/signup", UserController.register);
publicRouter.post("/api/users/login", UserController.login);
publicRouter.get(
  "/api/participants/courses",
  ParticipantController.getAllCourse
);
publicRouter.get(
  "/api/participants/courses/:id",
  ParticipantController.getOneCourse
);
publicRouter.get("/api/webhook", OrderController.webhook);
