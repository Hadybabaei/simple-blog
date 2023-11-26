const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp")

const articleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{ type: String, required: true },
    thumbnail:String,
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    images:{type:[String],default:[]},
    slug:String,
})

articleSchema.plugin(timeStamp)

const articleModel = mongoose.model("Articles",articleSchema)

module.exports = articleModel