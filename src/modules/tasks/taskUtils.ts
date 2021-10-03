import { Utils } from "../../helpers/utils";
import { Tasks } from "../../entities/Tasks.entity";
import { TaskInterface } from "../../interfaces/task.interface";

export class TaskUtils {
  public checkTaskExists = async (
    task: string,
    category_id: number,
    task_id?: number
  ) => {
    if (!task_id) {
      return await Tasks.findOne({
        where: {
          category_id,
          task,
        },
      });
    } else {
      return await Tasks.createQueryBuilder("tasks")
        .where(
          "category_id = :category_id AND task = :task AND id != :task_id",
          {
            category_id,
            task,
            task_id,
          }
        )
        .getOne();
    }
  };

  public addTask = async (taskData: any) => {
    const createTask: any = Tasks.create(taskData);
    await createTask.save();
    return createTask;
  };
  public getTasks = async (details: any, user_id: number) => {
    const { skip, limit } = Utils.getSkipLimit(details.page, details.limit);
    console.log("skip, ,limit", skip, limit);

    const { searchString } = details;
    let whereQuery =
      "t.is_active = :is_active AND t.is_deleted = :is_deleted AND t.user_id = :user_id";
    let whereQueryObj: any = {
      is_active: true,
      is_deleted: false,
      user_id,
    };
    if (searchString) {
      whereQuery += " AND t.task ILIKE :task";
      whereQueryObj["task"] = `%${searchString}%`;
    }
    let tasks = await Tasks.createQueryBuilder("t")
      .select([
        "t.task, t.id, categories.id AS category_id, categories.category_name",
      ])
      .leftJoin("t.category_id", "categories")
      .where(whereQuery, whereQueryObj)
      .offset(skip)
      .limit(limit)
      .getRawMany();
    let taskCount = await Tasks.createQueryBuilder("t")
      .leftJoin("t.category_id", "categories")
      .select(["t.task, categories.category_name"])
      .where(whereQuery, whereQueryObj)
      .getCount();
    return { tasks, taskCount };
  };

  public getTaskById = async (taskId: number) => {
    let taskDetails = await Tasks.createQueryBuilder("t")
      .select([
        "t.task, t.id, categories.id AS category_id, categories.category_name",
      ])
      .leftJoin("t.category_id", "categories")
      .where("t.id = :taskId", { taskId })
      .getRawOne();
    return taskDetails;
  };

  public updateTask = async (taskData: TaskInterface, task_id: number) => {
    return await Tasks.createQueryBuilder("")
      .update<TaskInterface>(Tasks, { ...taskData })
      .where("id = :id", { id: task_id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
  };
  public checkActionAllowed = async (task_id: number, user_id: number) => {
    return await Tasks.findOne({
      where: {
        user_id,
        id: task_id,
      },
    });
  };
}
