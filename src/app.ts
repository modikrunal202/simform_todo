import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
// import * as flash from 'express-flash';
const app = express();
import { createConnection } from "typeorm";
import {pagination} from 'typeorm-pagination'
import passport from "passport";
import { User } from "./entities/User.entity";
import { Routes } from "./routes";
import {
  initializePassport,
  jwtInitializePassport,
  googlePassportInitialize,
} from "./config/passport";
import { Categories } from "./entities/Category.entity";
import { Tasks } from "./entities/Tasks.entity";
dotenv.config()
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Categories, Tasks],
      synchronize: true,
      logging: true,
    });
    console.log("Connected to Postgres");
    // app.use(flash())
    await initializePassport(passport);
    await jwtInitializePassport(passport);
    await googlePassportInitialize(passport);
    const routes = new Routes();
    app.use(express.json());
    app.use(passport.initialize());
    app.use(pagination);
    app.use(cors())
    app.use("/api", routes.path(passport));
    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  } catch (error) {
    console.log("master commit...")
    console.error(error);
    throw new Error("Unable to connect to db");
  }
};

main();
