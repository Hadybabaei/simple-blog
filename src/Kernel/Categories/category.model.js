const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp")

const categorySchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    thumbnail:String
})

categorySchema.plugin(timeStamp)

const categoryModel = mongoose.model("Categories",categorySchema)

module.exports = categoryModel