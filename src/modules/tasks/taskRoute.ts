import { Router } from "express";
import { Middleware } from "../../middleware";
import { TaskController } from "./taskController";
import { TaskMiddleware } from "./taskMiddleware";
import { taskValidationRules } from "./taskValidator";
const router: Router = Router();

const taskController: TaskController = new TaskController();
const taskMiddleware: TaskMiddleware = new TaskMiddleware();
const middleware: Middleware = new Middleware();
router.post(
  "/add-task",
  taskValidationRules(),
  middleware.validate,
  taskMiddleware.checkTaskExists,
  taskController.addTask
);

router.get("/get-tasks", taskController.getTasks);
router.get("/get-task/:id", taskMiddleware.checkActionAllowed, taskController.getTaskById);
router.post(
  "/update-task",
  taskValidationRules(),
  middleware.validate,
  taskMiddleware.checkActionAllowed,
  taskMiddleware.checkTaskExists,
  taskController.updateTask
);
router.delete('/delete-task', taskMiddleware.checkActionAllowed, taskController.deleteTask)
export const TaskRoute: Router = router;
