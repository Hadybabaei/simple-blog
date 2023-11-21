const _Category = require("./category.model")
const mongoose = require("mongoose")

class CategoryService {
    
    createCategory = async (data) =>{
        try{
            const category = await this.getCategoryByTitle(data.title);
            if (category){
                throw new Error("Category is already available , please change the title");
            }
            return await _Category.create(data)
        }catch(err){
            throw err
        }
    }

    getCategoryByTitle = async(title)=>{
        try{
            const category = await _Category.findOne({title});
            return category
        }catch(err){
            throw err
        }
    }

    getCategoryById = async (id) =>{
        try{
            const category = await _Category.findOne({_id:id});
            return category
        }catch(err){
            throw err
        }
    }

    updateCategory = async (data)=>{
        try{
            const category = await this.getCategoryById(data.id); 
            if (!category){
                throw new Error ("Category Not Found");
            }
            return await _Category.updateOne({_id:data.id},{
                title:data.title,
                thumbnail:data.thumbnail,
                description:data.description
            })
        }catch(err){
            throw err
        }
    }

    deleteCategory = async (id)=>{
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error ("Category Not Found");
            }
            const category = await this.getCategoryById(id); 
            if (!category){
                throw new Error ("Category Not Found");
            }
            return await _Category.deleteOne({_id:id}); 
        }catch(err){
            throw err
        }
    }

    getAllCategories = async()=>{
        try{
            const categories = await _Category.find();
            return categories
        }catch(err){
            throw err
        }
    }
}

module.exports = CategoryService