import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import * as dotenv from "dotenv";
// import * as flash from 'express-flash';
const app = express();
import { createConnection } from "typeorm";
import { pagination } from "typeorm-pagination";
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
const swaggerDocument = require("../swagger.json")
dotenv.config();
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Categories, Tasks],
      synchronize: true,
      logging: true,
    });
    console.log("Connected to Postgres");
    const options = {
      swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
      }
    };
    // const specs = swaggerJsDoc(options);
    await initializePassport(passport);
    await jwtInitializePassport(passport);
    await googlePassportInitialize(passport);
    const routes = new Routes();
    app.use(express.json());
    app.use(passport.initialize());
    app.use(pagination);
    app.use(cors());
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/api", routes.path(passport));
    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to db");
  }
};

main();
