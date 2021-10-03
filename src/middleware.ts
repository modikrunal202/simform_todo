import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export class Middleware {
  public validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors: any = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: extractedErrors,
    });
  };

  public authenticateUserMiddleware = (passport: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(
        "jwt",
        { session: false },
        (err: any, user: any, info: any) => {
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
        }
      )(req, res, next);
    };
  };
}
