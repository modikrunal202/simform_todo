import { Utils } from "../../helpers/utils";
import { Categories } from "../../entities/Category";
import { CategoryInterface } from "src/Interfaces/category.interface";

export class CategoryUtils {
  public addCategory = async (categoryData: any) => {
    const createCategory: any = Categories.create(categoryData);
    await createCategory.save();
    return createCategory;
  };
  public checkCategoryExists = async (
    category_name: string,
    user_id: string,
    category_id?: number
  ) => {
    if (!category_id) {
      return await Categories.findOne({
        where: {
          user_id,
          category_name,
        },
      });
    } else {
      return await Categories.createQueryBuilder("categories")
        .where(
          "user_id = :user_id AND category_name = :category_name AND id != :category_id",
          {
            user_id,
            category_name,
            category_id,
          }
        )
        .getOne();
    }
  };
  public getCategories = async (details: any) => {
    const { skip, limit } = Utils.getSkipLimit(details.page, details.limit);
    const { searchString, sortBy, sortOrder, filterBy } = details;
    let whereQuery = "is_active = :is_active AND is_deleted = :is_deleted";
    let whereQueryObj: any = {
      is_active: 1,
      is_deleted: 0,
    };
    if (searchString) {
      const likePatten = Utils.removeApostropheFromLikeQuery(searchString);
      whereQuery += " AND category_name like :category_name";
      whereQueryObj["category_name"] = `%${searchString}%`;
    }
    let categories = await Categories.createQueryBuilder("")
      .where(whereQuery, whereQueryObj)
      .paginate();
    return categories;
  };

  public getCategoryById = async (categoryId: number) => {
    let categoryDetails = await Categories.findOne({ id: categoryId });
    return categoryDetails;
  };
  public updateCategoryData = async (
    categoryData: CategoryInterface,
    category_id: number
  ) => {
    return await Categories.createQueryBuilder("categories")
      .update<CategoryInterface>(Categories, { ...categoryData })
      .where("id = :id", { id: category_id })
      .returning("*") // returns all the column values
      .updateEntity(true)
      .execute();
  };
}
