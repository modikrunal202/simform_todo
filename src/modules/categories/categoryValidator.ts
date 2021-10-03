import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const categoryValidationRules = () => {
  return [
    // category name must be there.
    body("category_name", "Category Name Can't be empty").notEmpty(),
  ];
};


