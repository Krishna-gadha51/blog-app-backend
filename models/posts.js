const mongoose = require('mongoose');


const postsSchema=new mongoose.Schema({


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

    Message:String,

    postedDate:{type:Date,
        default:Date.now
    }
})

var postModel=mongoose.model("posts",postsSchema)
module.exports=postModel