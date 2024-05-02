var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({

    username: { type: String, required: true },
    phonenumber: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
    
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
