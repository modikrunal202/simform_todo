import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { TaskUtils } from "./taskUtils";

export class TaskMiddleware {
  private taskUtils: TaskUtils = new TaskUtils();
  public checkTaskExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { task, category_id, task_id } = req.body;
    const isTaskExists = await this.taskUtils.checkTaskExists(
      task,
      category_id,
      task_id
    );
    if (isTaskExists) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: "Task already exists." });
    } else {
      next();
    }
  };
  public checkActionAllowed = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const task_id =
      req.body && req.body.task_id ? req.body.task_id : +req.params.id;
    const user_id = res.locals._userInfo.id;
    const isCategoryExists = await this.taskUtils.checkActionAllowed(
      task_id,
      user_id
    );
    if (isCategoryExists) {
      next();
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Task not found." });
    }
  };
}
