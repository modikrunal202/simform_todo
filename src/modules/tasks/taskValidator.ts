import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const taskValidationRules = () => {
  return [
    // task name must be there.
    body("task", "Task Name Can't be empty").notEmpty(),
    body("category_id", "Category ID must be present").notEmpty(),
  ];
};


