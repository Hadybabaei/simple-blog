const { Router } = require("express");
const UserService = require("./user.service");
const validationMiddleware = require("../../middlewares/validation.middleware");
const { register, login } = require("./user.dto");
const { genSalt, hashPassword } = require("../../common/bcrypt");
const { generateJWT } = require("../../utils/token");
const HttpExceptions = require("../../utils/exceptions/http.exceptions");

class UserController {
  path = "/users";
  router = Router();
  _UserService = new UserService();
  constructor() {
    this.initiateRouter();
  }

  initiateRouter = () => {
    /**
     * @openapi
     * /api/register:
     *   post:
     *     tags:
     *       - Users
     *     description: Register a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - lastname
     *               - email
     *               - password
     *             properties:
     *               name:
     *                 type: string
     *               lastname:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         description: Registration Completed
     *         content:
     *           application/json:
     *             example:
     *               Message: Registration Completed
     *               token: [JWT_TOKEN]
     *               Success: true
     *       400:
     *         description: User Already Exists
     *         content:
     *           application/json:
     *             example:
     *               Message: User Already Exists
     *               Success: false
     *
     * /api/login:
     *   post:
     *     tags:
     *       - Users
     *     description: User login
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         description: Welcome
     *         content:
     *           application/json:
     *             example:
     *               Message: Welcome
     *               token: [JWT_TOKEN]
     *               Success: true
     *       401:
     *         description: Invalid credentials
     *         content:
     *           application/json:
     *             example:
     *               Message: Invalid credentials
     *               Success: false
     */

    this.router.post(
      "/register",
      validationMiddleware(register),
      this.userRegister
    );
    this.router.post("/login", validationMiddleware(login), this.login);
  };

  userRegister = async (req, res, next) => {
    try {
      const user = await this._UserService.findUserByEmail(req.body.email);
      if (user) {
        throw new HttpExceptions(400, "User Already Exists");
      }
      const salt = await genSalt();
      const password = await hashPassword(salt, req.body.password);
      req.body.password = password;
      req.body.salt = salt;
      req.body.last_login = Date.now();
      const newUser = await this._UserService.userRegister(req.body);
      const token = generateJWT({ email: newUser.email, id: newUser._id });
      res
        .status(201)
        .json({ Message: "Registration Completed", token, Success: true });
    } catch (err) {
      return next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const user = await this._UserService.userLogin(
        req.body.email,
        req.body.password
      );
      const token = generateJWT({ email: user.email, id: user._id });
      return res.status(201).json({ Message: "Welcome", token, Success: true });
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = UserController;
