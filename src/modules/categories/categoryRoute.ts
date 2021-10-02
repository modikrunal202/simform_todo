import { Router } from "express";
import { Middleware } from "../../middleware";
import { CategoryController } from "./categoryController";
import { CategoryMiddleware } from "./categoryMiddleware";
import { categoryValidationRules } from "./categoryValidator";
const router: Router = Router();
const categoryController: CategoryController = new CategoryController();
const categoryMiddleware: CategoryMiddleware = new CategoryMiddleware();
const middleware: Middleware = new Middleware();

router.post(
  "/add-category",
  categoryValidationRules(),
  middleware.validate,
  categoryMiddleware.checkCategoryExists,
  categoryController.addCategory
);

router.get(
    "/get-categories",
    categoryController.getCategories
)
router.get('/get-category/:id', categoryController.getCategoryDetails)
router.post('/update-category', categoryValidationRules(), middleware.validate,
categoryMiddleware.checkCategoryExists, categoryController.updateCategory)
router.delete('/delete-category', categoryController.deleteCategory)

export const CategoryRoute: Router = router;
