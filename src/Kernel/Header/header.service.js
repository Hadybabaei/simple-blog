const HttpExceptions = require("../../utils/exceptions/http.exceptions");
const headerModel = require("./header.model");

class HeaderService {
  _Header = headerModel;

  createHeader = async (data) => {
    try {
      return await this._Header.create(data);
    } catch (err) {
      throw err;
    }
  };

  editHeader = async (data) => {
    try {
      const header = await this._Header.findOne({
        _id: data._id,
      });
      if (!header) {
        throw new HttpExceptions(404, "Menu not found");
      }
      return await this._Header.updateOne(
        { menu_title: data.menu_title },
        {
          ...data,
        }
      );
    } catch (err) {
      throw err;
    }
  };

  deleteMenu = async (id) => {
    try {
      const header = await this._Header.findOne({
        _id: id,
      });
      if (!header) {
        throw new HttpExceptions(404, "Menu not found");
      }
      return await this._Header.deleteOne({ _id: id });
    } catch (err) {
      throw err;
    }
  };

  getAllMenus = async () => {
    try {
      return await this._Header.find();
    } catch (err) {
      throw err;
    }
  };

  getMenuById = async (id) => {
    try {
      const header = await this._Header.findOne({
        _id: id,
      });
      if (!header) {
        throw new HttpExceptions(404, "Menu not found");
      }

      return header;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = HeaderService;
