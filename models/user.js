let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt')

let schema = new Schema({
    username: {type:String, require:true}, 
    password: {type:String, require:true}, 
    role: {type:String, required:true}
})

schema.statics.hashPassword = (password) => {
    console.log({password})
    return bcrypt.hashSync(password, 10)
}

schema.methods.isValid = (hashedPassword, pw) => {
    console.log({hashedPassword})
    console.log({pw})
    return bcrypt.compareSync(pw, hashedPassword)
}

module.exports = mongoose.model('User', schema)