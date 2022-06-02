const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        name:{type:String},
        email:{type: String,unique:true},
        password:{type:String},
        place:{type:String}

    },
    {
        timestamps:true,
        collection:"USER"
    }
)

const USER = mongoose.model("USER",userSchema)
module.exports =USER