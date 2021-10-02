import express from "express";
import { AuthRoute } from "./modules/auth/authRoute";

export class Routes {
  // public passport;
  constructor(passport: any) {
    // this.passport = passport;
  }
  public path(passport: any) {
    const router = express.Router();
    router.use("/auth", AuthRoute(passport));
    router.use(
      "/test",
      passport.authenticate("jwt", { session: false }),
      AuthRoute(passport)
    );
    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: "URL Not Found",
      });
    });
    return router;
  }
}
