import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryUtils } from "./categoryUtils";

export class CategoryMiddleware {
    private categoryUtils: CategoryUtils = new CategoryUtils();
    public checkCategoryExists = async(req: Request, res: Response, next: NextFunction) => {
        const {category_name, category_id} = req.body;
        const user_id = res.locals._userInfo.id
        const isCategoryExists = await this.categoryUtils.checkCategoryExists(category_name, user_id, category_id)
        console.log('isCategoryExists', isCategoryExists)
        if (isCategoryExists) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: "Category already exists."})
        } else {
            next()
        }
    }
}