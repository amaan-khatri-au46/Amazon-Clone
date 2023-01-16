const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const reviewSchema = new Schema({

    comment:{
        type: String,
        maxlength:1000,
    },
    postedOn:{
        type:Date,
        default:Date.now()
    },
    productId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'products'
    }
})

const reviewModel = mongoose.model('reviews',reviewSchema)

module.exports = reviewModel