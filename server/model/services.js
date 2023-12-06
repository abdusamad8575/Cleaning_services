const mongoose = require('mongoose')

const service=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})


const services=mongoose.model('services',service)
module.exports = services