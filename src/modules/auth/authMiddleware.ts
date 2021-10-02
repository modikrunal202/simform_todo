import { Request, Response, NextFunction } from "express";
import { AuthUtils } from "./authUtils";
import { StatusCodes } from "http-status-codes";
// import * as passportLocal from 'passport-local';
// const LocalStrategy = passportLocal.Strategy;
export class AuthMiddleware {
  private authUtils: AuthUtils = new AuthUtils();
  public checkUserExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const userData = await this.authUtils.checkUserExists(email);
    if (userData) {
      res.locals._userInfo = userData;
      next();
    } else {
      return res.status(404).json({ error: "Credentials are wrong." });
    }
  };

  public authenticateUser = (passport: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate("local", function (err: any, user: any, info: any) {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Something went wrong" });
        }
        if (info) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: info.message });
        }
        if (user) {
          res.locals._userInfo = user;
          next();
        }
      })(req, res, next);
    };
  };
}
