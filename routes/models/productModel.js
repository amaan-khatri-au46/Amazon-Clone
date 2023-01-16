const mongoose = require('mongoose')
const {Schema} = require('mongoose')


const productSchema = new Schema({

    name:{
        type:String,
        // minlength:1,
        // maxlength:100,
    },
    category:{
        type:String,
    },
    price:{
        type:Number,
        // min:1,
        // max:15,
    },
    brand:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    // reviews:[{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'reviews'
    // }],
    imageUrl: String

})

const productModel= mongoose.model('products',productSchema)
module.exports=productModel;