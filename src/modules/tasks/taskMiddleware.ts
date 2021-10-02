import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { TaskUtils } from "./taskUtils";

export class TaskMiddleware {
    private taskUtils: TaskUtils = new TaskUtils();
  public checkTaskExists = async(req: Request, res: Response, next: NextFunction) => {
    const { task, category_id, task_id } = req.body;
    const isTaskExists = await this.taskUtils.checkTaskExists(task, category_id, task_id)
    if (isTaskExists) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: "Task already exists."})
    } else {
        next()
    }
  }
}
