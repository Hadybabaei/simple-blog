const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp")

const headerSchema = mongoose.Schema({
    menu_title:{
        type:String,
        required:true
    },
    sub_menu:[String],
    order:Number,
    visibility:{type:Boolean,default:true}
})

headerSchema.plugin(timeStamp)

const headerModel = mongoose.model("Header",headerSchema)

module.exports = headerModel