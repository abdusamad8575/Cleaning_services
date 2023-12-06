const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    orderDetails:[
        {
            serviceName:{
                type: String
            },
            subCategory:[
                {
                    orderServises:{
                        type: String
                    },
                    price:{
                        type:Number
                    }
                }
            ]
        }
    ],
    total:{
        type:Number
    },
    status:{
        type: String
    }

    
})

const order=mongoose.model('orders',orders)
module.exports = order