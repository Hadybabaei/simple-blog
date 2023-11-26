const _Article = require("./article.model")
const mongoose = require("mongoose")

class ArticleService {
    
    createArticle = async (data,user) =>{
        try{
            const article = await this.getArticleByTitle(data.title);
            if (article){
                throw new Error("Article is already available , please change the title");
            }
            console.log(user);
            data.user = user
            return await _Article.create(data)
        }catch(err){
            throw err
        }
    }

    getArticleByTitle = async(title)=>{
        try{
            const article = await _Article.findOne({title});
            return article
        }catch(err){
            throw err
        }
    }

    getArticleById = async (id) =>{
        try{
            const article = await _Article.findOne({_id:id});
            return article
        }catch(err){
            throw err
        }
    }

    updateArticle = async (data,user)=>{
        try{
            const article = await this.getArticleById(data.id); 
            if (!article){
                throw new Error ("Category Not Found");
            }
            return await _Article.updateOne({_id:data.id},{
                title:data.title,
                thumbnail:data.thumbnail,
                description:data.description,
                content:data.content,
                user,
                category:data.category,
                slug:data.slug
            })
        }catch(err){
            throw err
        }
    }

    deleteArticle = async (id)=>{
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error ("Article Not Found");
            }
            const article = await this.getArticleById(id); 
            if (!article){
                throw new Error ("Article Not Found");
            }
            return await _Article.deleteOne({_id:id}); 
        }catch(err){
            throw err
        }
    }

    getAllArticle = async()=>{
        try{
            const articles = await _Article.find().populate("user");
            return articles
        }catch(err){
            throw err
        }
    }
}

module.exports = ArticleService