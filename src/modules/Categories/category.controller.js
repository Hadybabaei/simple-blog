const { Router } = require("express")
const isLogged = require("../../middlewares/authentication.middleware")
const CategoryService = require("./category.service")
const validationMiddleware = require("../../middlewares/validation.middleware")
const {createCategory, editCategory} = require("./category.dto")
const HttpExceptions = require("../../utils/exceptions/http.exceptions")
class CategoryController {
    path = "/categories"
    router = Router()
    _categoryService = new CategoryService()
    constructor(){
        this.initiateRouter()
    }

    initiateRouter  = ()=>{
        this.router.post(this.path,isLogged,validationMiddleware(createCategory),this.createCategory)
        this.router.get(this.path,isLogged,this.getAllCategories)
        this.router.put(this.path,isLogged,validationMiddleware(editCategory),this.updateCategory)
        this.router.delete(`${this.path}/:id`,isLogged,this.deleteCategory)
    }

    createCategory = async(req,res,next)=>{
        try{
            const newCategory = await this._categoryService.createCategory(req.body)
            res.status(201).json({Message:"Category Created Successfully",Success:true})
        }catch(err){
            throw err
        }
    }

    updateCategory = async(req,res,next)=>{
        try{
            const updateCategory = await this._categoryService.updateCategory(req.body);
            res.status(200).json({Message:"Category Updated Successfully",Success:true})
        }catch(err){
            return next(err)
        }
    }

    getAllCategories = async(req,res,next)=>{
        try{
            const categories = await this._categoryService.getAllCategories();
            res.status(200).json({categories,Success:true})
        }catch(err){
            return next(err)
        }
    }

    deleteCategory = async(req,res,next)=>{
        try{
            const category = await this._categoryService.deleteCategory(req.params.id);
            res.status(200).json({Message:"Category Deleted Successfully",Success:true})
        }catch(err){
            const error = new HttpExceptions(404,err.message)
            return next(error)
        }
    }
}

module.exports = CategoryController