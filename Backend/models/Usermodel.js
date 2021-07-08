const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema =new Schema({
    name: { type: String},
    password : { type: String},
    email:  { type: String}
});

UserSchema.methods.encryptPass= async(password)=>{

    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password, salt) 
    return (hash)


};

UserSchema.methods.validatePass= function (password) {
    
   return bcrypt.compare(password, this.password) 
    

};

module.exports= mongoose.model('User', UserSchema); 