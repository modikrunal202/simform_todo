import { Router } from "express";
import { Middleware } from "../../middleware";
import { CategoryController } from "./categoryController";
import { CategoryMiddleware } from "./categoryMiddleware";
import { categoryValidationRules } from "./categoryValidator";
const router: Router = Router();
const categoryController: CategoryController = new CategoryController();
const categoryMiddleware: CategoryMiddleware = new CategoryMiddleware();
const middleware: Middleware = new Middleware();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: category module routes
 */

/**
 * @swagger
 * /api/categories/add-category:
 *   post:
 *     tags: [Category]
 *     description: Category add 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *           examples:
 *             '0':
 *               value: "{\r\n    \"category_name\": \"grocerry\"\r\n}"
 *     responses:
 *       '200':
 *         description: category added successfully.
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 */

router.post(
  "/add-category",
  categoryValidationRules(),
  middleware.validate,
  categoryMiddleware.checkCategoryExists,
  categoryController.addCategory
);

/**
 * @swagger
 * /api/categories/get-categories:
 *   get:
 *     tags: [Category]
 *     description: get categories
 *     BearerAuth:
 *       type: http
 *       scheme: bearer

 *     parameters:
 *       - name: searchString
 *         in: query
 *         allowEmptyValue: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         schema:
 *           type: string
 *         example: '10'
 *       - name: page
 *         in: query
 *         schema:
 *           type: string
 *         example: '1'
 *     responses:
 *       '200':
 *         description: get categories
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 */
router.get(
    "/get-categories",
    categoryController.getCategories
)
router.get('/get-category/:id', categoryController.getCategoryDetails)
router.post('/update-category', categoryValidationRules(), middleware.validate,
categoryMiddleware.checkCategoryExists, categoryController.updateCategory)
router.delete('/delete-category', categoryController.deleteCategory)

export const CategoryRoute: Router = router;
