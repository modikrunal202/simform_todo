import * as passportLocal from "passport-local";
import * as passportJWT from "passport-jwt";
import { AuthUtils } from "../modules/auth/authUtils";
const bcrypt = require("bcryptjs");
const LocalStrategy: any = passportLocal.Strategy;
const JwtStrategy: any = passportJWT.Strategy;
const ExtractJwt: any = passportJWT.ExtractJwt;
const authUtils: AuthUtils = new AuthUtils();

export async function jwtInitializePassport(passport: any) {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: "secret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      (jwt_payload: any, next: any) => {
        if (jwt_payload && jwt_payload.id) {
          next(null, true);
        } else {
          next(null, false);
        }
      }
    )
  );
}

export async function initializePassport(passport: any) {
  const authenticateUser = async (
    req: any,
    email: string,
    password: string,
    done: any
  ) => {
    const userInfo: any = await authUtils.checkUserExists(email);
    if (!userInfo) {
      done(null, false, { message: "Credentials are wrong" });
    }
    const isPasswordMatch = bcrypt.compareSync(password, userInfo.password);

    if (isPasswordMatch) {
      done(null, userInfo);
    } else {
      done(null, false, { message: "Credentials are wrong" });
    }
  };
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      authenticateUser
    )
  );
}
