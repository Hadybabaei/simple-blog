const App = require("./app")
const ArticleController = require("./modules/Articles/article.controller")
const CategoryController = require("./modules/Categories/category.controller")
const UserController = require("./modules/Users/user.controller")
require("dotenv").config()


const app = new App([new UserController(),new CategoryController(),new ArticleController],process.env.PORT)

