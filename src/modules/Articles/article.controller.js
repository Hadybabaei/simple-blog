const { Router, response } = require("express");
const isLogged = require("../../middlewares/authentication.middleware");
const validationMiddleware = require("../../middlewares/validation.middleware");
const { createArticle } = require("./article.dto");
const ArticleService = require("./article.service");

class ArticleController {
  path = "/articles";
  router = Router();
  _ArticleService = new ArticleService();

  constructor() {
    
    this.initiateRouter();
  }

  initiateRouter = () => {
    this.router.post(
      this.path,
      isLogged,
      validationMiddleware(createArticle),
      this.createArticle
    );
/**
 * @openapi
 * /api/articles:
 *   post:
 *     tags:
 *       - Articles
 *     description: Create a new article
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article Created Successfully
 *         content:
 *           application/json:
 *             example:
 *               Message: Article Created Successfully
 *               Success: true
 *
 *   get:
 *     tags:
 *       - Articles
 *     description: Responds if the app is up and articles are available
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: App is running and up
 */

    this.router.get(this.path, isLogged, this.getAllArticles);
  };

  createArticle = async (req, res, next) => {
    try {
      console.log(req.user);
      const article = await this._ArticleService.createArticle(
        req.body,
        req.user.id
      );

      res
        .status(201)
        .json({ Message: "Article Created Successfully", Success: true });
    } catch (err) {
      return next(err);
    }
  };

  getAllArticles = async (req, res, next) => {
    try {
      const articles = await this._ArticleService.getAllArticle();
      res.status(200).json({ articles, Success: true });
    } catch (err) {
      return next(err);
    }
  };

  deleteArticle = async (req, res, next) => {
    try {
      const articles = await this._ArticleService.deleteArticle(req.params.id);
      res
        .status(200)
        .json({ Message: "Article Deleted Successfully", Success: true });
    } catch (err) {
      const error = new HttpExceptions(404, err.message);
      return next(error);
    }
  };
}

module.exports = ArticleController;
