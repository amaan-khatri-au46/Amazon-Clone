const productModel = require('../models/productModel')
const reviewModel = require('../models/reviewModel')

const  getAllReview = async(req,res) =>{

   
    const {productId} = req.params
    try {
        const products = await reviewModel.find ({productId:productId})
        res.status(200).send({status: 'success', products})
       
    } catch (error) {
        res.status(404).send({status:'error', msg:'Error fetching product from DB',error})
    }

}

const  addReview = async(req,res) =>{

const {productId} = req.params
const {comment} = req.body

try {
    const addedReview = await reviewModel.create({comment,productId})
    const updatedProduct = await productModel.findByIdAndUpdate(productId,{
        $push:{
            reviews:addedReview._id
        },
    })
    res.send({status:'success',review:addedReview})

} catch (error) {
    res.status(500).send({status:error,msg:'error adding review',error})
}   
}

const  deleteReview = (req,res) =>{

}

module.exports = {
    getAllReview,
    addReview,
    deleteReview,
}