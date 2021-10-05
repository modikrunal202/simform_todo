import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
const app = express();
import { createConnection } from "typeorm";
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
const PORT = process.env.PORT || 8080
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
    await initializePassport(passport);
    await jwtInitializePassport(passport);
    await googlePassportInitialize(passport);
    const routes = new Routes();
    app.use(express.json());
    app.use(passport.initialize());
    app.use(cors())
    app.use("/api", routes.path(passport));
    app.listen(PORT, () => {
      console.log("Now running on port ", PORT);
    });
  } catch (error) {
    console.error(error);
    console.log("Commit 1")
    throw new Error("Unable to connect to db");
  }
};

main();
