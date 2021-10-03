import * as passportLocal from "passport-local";
import * as passportJWT from "passport-jwt";
import * as passportGoogle from "passport-google-oauth2";
import { getConnection } from "typeorm";
import { AuthUtils } from "../modules/auth/authUtils";
import { User } from "src/entities/User.entity";
const bcrypt = require("bcryptjs");
const LocalStrategy: any = passportLocal.Strategy;
const JwtStrategy: any = passportJWT.Strategy;
const ExtractJwt: any = passportJWT.ExtractJwt;
const GoogleStrategy: any = passportGoogle.Strategy;
const authUtils: AuthUtils = new AuthUtils();

export async function jwtInitializePassport(passport: any) {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.JWT_SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (jwt_payload: any, next: any) => {
        if (jwt_payload && jwt_payload.id) {
          const userInfo: any = await authUtils.getUserDetailsById(
            jwt_payload.id
          );
          if (userInfo) {
            return next(null, userInfo);
          } else {
            return next(null, false, "Authentication Failed");
          }
        } else {
          next(null, false, "No Auth Token Provided");
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

export async function googlePassportInitialize(passport: any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
        passReqToCallback: true,
      },
      async function (
        request: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: any
      ) {
        if (profile) {
          const userInfo = {
            email: profile.email,
            first_name: profile.given_name,
            last_name: profile.family_name,
          };
          const userDetails: any = await authUtils.checkUserExists(
            profile.email
          );
          if (!userDetails) {
            const addUser = await authUtils.createUser(userInfo);
            return cb(false, addUser);
          }
          return cb(false, userDetails);
        }
      }
    )
  );
}
