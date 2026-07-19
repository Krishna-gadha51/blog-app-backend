const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {

    name: {
        type: String,
        required: true
    },
    phone:String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }

    }
)

var UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;