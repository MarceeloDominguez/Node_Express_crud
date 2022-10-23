import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  taskToggleCompleted,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router();

router.get("/", getTasks);

router.post("/task", createTask);

router.delete("/task/:id", deleteTask);

router.put("/task/:id", updateTask);

router.get("/task/:id", getTask);

router.put("/taskToggle/:id", taskToggleCompleted);

export default router;
