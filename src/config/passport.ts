import * as passportLocal from "passport-local";
import * as passportJWT from "passport-jwt";
import * as passportGoogle from "passport-google-oauth2";
import { getConnection } from "typeorm";
import { AuthUtils } from "../modules/auth/authUtils";
import { User } from "src/entities/User";
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

export async function googlePassportInitialize(passport: any) {
  console.log("google passport...");

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "191620509869-tksme5u9dekva7gaqu3er3l0frg7k1a0.apps.googleusercontent.com",
        clientSecret: "ahPp6q4JDzp_e3lBt46ccZSe",
        callbackURL: "http://localhost:8080/api/auth/google/callback",
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
          console.log("profile-----", userInfo);
          const userDetails: any = await authUtils.checkUserExists(profile.email);
          if (!userDetails) {
            const addUser = await authUtils.createUser(userInfo)
            return cb(false, addUser);
          }
          return cb(false, userDetails);
        }
      }
    )
  );
}
