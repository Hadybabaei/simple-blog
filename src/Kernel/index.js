const UserController = require("./Users/user.controller");
const HeaderController = require("./Header/header.controller");
const CategoryController = require("./Categories/category.controller");
const ArticleController = require("./Articles/article.controller");

const headerModule = new HeaderController()
const userModule = new UserController()
const categoryModule = new CategoryController()
const articleModule = new ArticleController()

module.exports = {headerModule,userModule,categoryModule,articleModule}