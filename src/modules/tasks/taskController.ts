import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TaskInterface } from "../../Interfaces/task.interface";
import { TaskUtils } from "./taskUtils";

export class TaskController {
  private taskUtils: TaskUtils = new TaskUtils();
  public addTask = async (req: Request, res: Response) => {
    try {
      const taskData = {
        task: req.body.task,
        category_id: req.body.category_id,
        user_id: res.locals._userInfo.id,
      };
      await this.taskUtils.addTask(taskData);
      return res.status(StatusCodes.OK).json({ message: "Task Created" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };

  public getTasks = async (req: Request, res: Response) => {
    try {
      const getTasks = await this.taskUtils.getTasks(req.query);
      return res
        .status(StatusCodes.OK)
        .json({ data: getTasks.tasks, totalCount: getTasks.taskCount });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
  public getTaskById = async (req: Request, res: Response) => {
    try {
      const taskDetails = await this.taskUtils.getTaskById(+req.params.id);
      return res.status(StatusCodes.OK).json({ data: taskDetails });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
  public updateTask = async (req: Request, res: Response) => {
    try {
      const updateTask: TaskInterface = {
        task: req.body.task,
        category_id: req.body.category_id,
        is_active: req.body.is_active === 0 ? 0 : 1,
        is_deleted: req.body.is_deleted === 1 ? 1 : 0,
      };
      await this.taskUtils.updateTask(updateTask, req.body.task_id);
      return res
        .status(StatusCodes.OK)
        .json({ message: "Task updated successfully." });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
  public deleteTask = async (req: Request, res: Response) => {
    try {
      const deleteCategory: any = {
        is_deleted: req.body.is_deleted,
      };
      await this.taskUtils.updateTask(
        deleteCategory,
        req.body.task_id
      );
      return res
        .status(StatusCodes.OK)
        .json({ message: "Task deleted Successfully`" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
}
