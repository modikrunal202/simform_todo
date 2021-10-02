import express from "express";
import { Middleware } from "./middleware";
import { AuthRoute } from "./modules/auth/authRoute";
import { CategoryRoute } from "./modules/categories/categoryRoute";
import { TaskRoute } from "./modules/tasks/taskRoute";

export class Routes {
  public path(passport: any) {
    const middleware: Middleware = new Middleware()
    const router = express.Router();
    router.use("/auth", AuthRoute(passport));
    router.use(
      "/categories",
      middleware.authenticateUserMiddleware(passport),
      CategoryRoute
    );
    router.use("/tasks", middleware.authenticateUserMiddleware(passport), TaskRoute)
    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: "URL Not Found",
      });
    });
    return router;
  }
}
