const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true

    },

    slug:{
        type:String,
        unique: true
    },

    parentId:{
        type:String,
        unique:true
    }
    

},
{timestamps: true},
)


module.exports = mongoose.model('Category',userSchema);