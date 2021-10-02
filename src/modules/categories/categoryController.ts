import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryInterface } from "src/Interfaces/category.interface";
import { CategoryUtils } from "./categoryUtils";

export class CategoryController {
  private categoryUtils: CategoryUtils = new CategoryUtils();
  public addCategory = async (req: Request, res: Response) => {
    try {
      const categoryData = {
        category_name: req.body.category_name,
        user_id: res.locals._userInfo.id,
      };
      await this.categoryUtils.addCategory(categoryData);
      return res.status(StatusCodes.OK).json({ message: "Category Created" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
  public getCategories = async (req: Request, res: Response) => {
    try {
      const getCategories = await this.categoryUtils.getCategories(req.query);
      //   console.log('getCategories',getCategories)
      return res.status(StatusCodes.OK).json({ data: getCategories.categories, totalCount: getCategories.categorieCount });
    } catch (error) {
      console.error("error", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
  public getCategoryDetails = async (req: Request, res: Response) => {
    try {
      const categoryDetails = await this.categoryUtils.getCategoryById(
        +req.params.id
      );
      //   console.log('getCategories',getCategories)
      return res.status(StatusCodes.OK).json({ data: categoryDetails });
    } catch (error) {
      console.error("error", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
  public updateCategory = async (req: Request, res: Response) => {
    try {
        const updateCategory: CategoryInterface = {
            category_name: req.body.category_name,
            is_active: req.body.is_active === 0 ? 0 : 1,
            is_deleted: req.body.is_deleted === 1 ? 1 : 0
        }
        await this.categoryUtils.updateCategoryData(updateCategory, req.body.category_id)
        return res.status(StatusCodes.OK).json({ message: "Category Updated Successfully`" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
  public deleteCategory = async (req: Request, res: Response) => {
    try {
        const deleteCategory: any = {
            is_deleted: req.body.is_deleted
        }
        await this.categoryUtils.updateCategoryData(deleteCategory, req.body.category_id)
        return res.status(StatusCodes.OK).json({ message: "Category deleted Successfully`" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong." });
    }
  };
}
