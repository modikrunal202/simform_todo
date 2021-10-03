import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryUtils } from "./categoryUtils";

export class CategoryMiddleware {
    private categoryUtils: CategoryUtils = new CategoryUtils();
    public checkCategoryExists = async(req: Request, res: Response, next: NextFunction) => {
        const {category_name, category_id} = req.body;
        const user_id = res.locals._userInfo.id
        const isCategoryExists = await this.categoryUtils.checkCategoryExists(category_name, user_id, category_id)
        if (isCategoryExists) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: "Category already exists."})
        } else {
            next()
        }
    }
    public checkActionAllowed = async(req: Request, res: Response, next: NextFunction) => {
        const category_id = req.body && req.body.category_id ? req.body.category_id : +req.params.id
        const user_id = res.locals._userInfo.id
        const isCategoryExists = await this.categoryUtils.checkActionAllowed(category_id, user_id)
        if (isCategoryExists) {
            next()
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({error: "Category not found."})
        }
    }
}