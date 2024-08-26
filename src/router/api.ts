import express from "express";
import { CategoryController } from "../controller/category-controller";
import { authenticatedUser } from "../middleware/auth";
import { isAdmin } from "../middleware/authorization";
import multer from "../middleware/multer";
import { MentorController } from "../controller/mentor-controller";
import { CourseController } from "../controller/course-controller";
import { ChapterController } from "../controller/chapter-controller";
import { LessonController } from "../controller/lesson-controller";
import { OrderController } from "../controller/order-controller";

export const apiRouter = express.Router();
apiRouter.use(authenticatedUser);

// category
apiRouter.post("/api/categories/create", isAdmin, CategoryController.create);
apiRouter.get("/api/categories", isAdmin, CategoryController.getAll);
apiRouter.put("/api/categories/update/:id", isAdmin, CategoryController.update);
apiRouter.delete(
  "/api/categories/delete/:id",
  isAdmin,
  CategoryController.delete
);

// mentor
apiRouter.post(
  "/api/mentors/create",
  isAdmin,
  multer.single("avatar"),
  MentorController.create
);
apiRouter.get("/api/mentors", isAdmin, MentorController.getAll);
apiRouter.put(
  "/api/mentors/update/:id",
  isAdmin,
  multer.single("avatar"),
  MentorController.update
);
apiRouter.delete("/api/mentors/delete/:id", isAdmin, MentorController.delete);

// course
apiRouter.post(
  "/api/courses/create",
  isAdmin,
  multer.single("thumbnail"),
  CourseController.create
);
apiRouter.get("/api/courses", isAdmin, CourseController.getAll);
apiRouter.put(
  "/api/courses/update/:id",
  isAdmin,
  multer.single("thumbnail"),
  CourseController.update
);
apiRouter.delete("/api/courses/delete/:id", isAdmin, CourseController.delete);
apiRouter.put(
  "/api/courses/status/:id",
  isAdmin,
  CourseController.changeStatus
);

// chapter
apiRouter.post("/api/chapters/create", isAdmin, ChapterController.create);
apiRouter.get("/api/chapters", isAdmin, ChapterController.getAll);
apiRouter.put("/api/chapters/update/:id", isAdmin, ChapterController.update);
apiRouter.delete("/api/chapters/delete/:id", isAdmin, ChapterController.delete);

// lesson
apiRouter.post("/api/lessons/create", isAdmin, LessonController.create);
apiRouter.get("/api/lessons", isAdmin, LessonController.getAll);
apiRouter.put("/api/lessons/update/:id", isAdmin, LessonController.update);
apiRouter.delete("/api/lessons/delete/:id", isAdmin, LessonController.delete);

// order
apiRouter.post("/api/orders/create", OrderController.createOrder);
apiRouter.get("/api/check-bought/:id", OrderController.checkCourse);
