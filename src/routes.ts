import express from "express";
import { Middleware } from "./middleware";
import { AuthRoute } from "./modules/auth/authRoute";
import { CategoryRoute } from "./modules/categories/categoryRoute";

export class Routes {
  public path(passport: any) {
    const middleware: Middleware = new Middleware()
    const router = express.Router();
    router.use("/auth", AuthRoute(passport));
    router.use(
      "/categories",
      middleware.authenticateUserMiddleware(passport),
      // passport.authenticate("jwt", { session: false }),
      CategoryRoute
    );
    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: "URL Not Found",
      });
    });
    return router;
  }
}
