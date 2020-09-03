let mongoose = require('mongoose')
let Schema = mongoose.Schema

let schema = new Schema({
    title: {type:String, require:true}, 
    desc: {type:String, require:true}, 
    username: {type:String, required:true},
    likes: {type:Number, required:true}
})

module.exports = mongoose.model('Post', schema)