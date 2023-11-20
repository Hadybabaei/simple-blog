const App = require("./app")
const UserController = require("./modules/Users/user.controller")
require("dotenv").config()


const app = new App([new UserController()],process.env.PORT)

