const { Router } = require("express");
const isLogged = require("../../middlewares/authentication.middleware");
const HeaderService = require("./header.service");

class HeaderController {
  router = Router();
  path = "/headers";
  _headerService = new HeaderService();

  constructor() {
    this.initiateRouter();
  }

  initiateRouter = () => {
    this.router.get(this.path, isLogged, this.getAllMenus);
    this.router.get(`${this.path}/:id`, isLogged, this.getMenuById);
    this.router.post(this.path, isLogged, this.createMenu);
    this.router.put(this.path, isLogged, this.editMenu);
    this.router.delete(`${this.path}/:id`, isLogged, this.deleteMenu);
  };

  createMenu = async (req, res, next) => {
    try {
      const newMenu = await this._headerService.createHeader(req.body);
      res
        .status(201)
        .json({ Message: "Menu Created Successfully", Success: true });
    } catch (err) {
      return next(err);
    }
  };

  editMenu = async (req, res, next) => {
    try {
      const editedMenu = await this._headerService.editHeader(req.body);
      res
        .status(200)
        .json({ Message: "Menu Edited Successfully", Status: true });
    } catch (err) {
      return next(err);
    }
  };

  deleteMenu = async (req, res, next) => {
    try {
      const deletedMenu = await this._headerService.deleteMenu(req.params.id);
      res.status(200).json({
        Message: "Menu Deleted Successfully",
        Success: true,
      });
    } catch (err) {
      return next(err);
    }
  };

  getAllMenus = async (req, res, next) => {
    try {
      const menus = await this._headerService.getAllMenus();
      res.status(200).json({
        menus,
        Success: true,
      });
    } catch (err) {
      return next(err);
    }
  };

  getMenuById = async (req, res, next) => {
    try {
      const menu = await this._headerService.getMenuById(req.params.id);
      res.status(200).json({
        menu,
        Success: true,
      });
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = HeaderController