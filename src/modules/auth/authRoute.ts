import { Router } from "express";
import { Middleware } from "../../middleware";

import { AuthController } from "./authController";
import { AuthMiddleware } from "./authMiddleware";
import { authValidationRules } from "./authValidator";
const router: Router = Router();
const authController: AuthController = new AuthController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();
const middleware: Middleware = new Middleware();
export function AuthRoute(passport: any) {

/**
 * @swagger
 * tags:
 *   name: authentication
 *   description: Authentication routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *        id:
 *          type: integer
 *        token:
 *          type: string
 *      
*/

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [authentication]
 *     summary: Signup new user
 *     description: signup user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               last_name:
 *                 type: string
 *               first_name:
 *                 type: string
 *               email:
 *                 type: string
 *           examples:
 *             '0':
 *               value: "{\r\n    \"first_name\": \"krunal\",\r\n    \"last_name\": \"modi\",\r\n    \"email\": \"test2@test.com\",\r\n    \"password\": \"12356\"\r\n}"
 *     responses:
 *       '201':
 *         description: User create
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
*/
  router.post("/signup", authValidationRules(), middleware.validate, authMiddleware.checkEmailExists, authController.userSignup);

  /**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags: [authentication]
 *     summary: signin new user
 *     description: Logedin user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *           examples:
 *             '0':
 *               value: "{\r\n    \"email\": \"test1@test.com\",\r\n    \"password\": \"123\"\r\n}"
 *     responses:
 *       '200':
 *         description: Auto generated using Swagger Inspector
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
*/
  router.post(
    "/signin",
    authMiddleware.authenticateUser(passport),
    authController.userLogin
  );
  router.get('/google-signin', authController.googleSignIn)
  router.get("/google", passport.authenticate("google", { scope: ["email", "profile"]}), authController.userLogin)
  router.get("/google/callback", authMiddleware.authenticateGoogleUsers(passport), authController.userLogin)
  return router;
}
