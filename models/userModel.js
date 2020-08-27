const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    trim:true,
    required:true
},
email:{
    type: String,
    trim:true,
    required:true
},
hashed_password:{
    type: String,
    
    required:true
},
salt:String,
created:{
    type:Date,
    default:Date.now
},
updated :Date,
photo:{
    data:Buffer,
    contentType:String
},
about:{
    type:String,
    trim:true
}

})

//virtual field

userSchema.virtual('password')
.set(function(password){
    //temperory memoror for password
    this._password = password 
    //generate a time stamp
    this.salt = uuidv4()

    //encript the password 

    this.hashed_password = this.encryptPassowrd(password)


})
.get(function(){
    return this._password
})

//methods
userSchema.methods = {
    authenticate:function(plainText){
        return this.encryptPassowrd(plainText) === this.hashed_password
    },

    encryptPassowrd:function(password){
        if (!password) return "";
        try{
             return crypto.createHmac('sha1',this.salt)
             .update(password)
             .digest('hex')
        }
        catch(err){
            return ""
        }

}
}

module.exports = mongoose.model("User", userSchema)