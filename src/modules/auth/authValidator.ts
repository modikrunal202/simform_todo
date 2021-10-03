import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const authValidationRules = () => {
  return [
    // task name must be there.
    body("email", "Email Can't be empty").notEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password Can't be empty").notEmpty(),
    body("password", "Password must be between 5 to 8 characters").isLength({min: 5, max: 8}),
    body("first_name", "First Name Can't be empty").notEmpty(),
  ];
};


