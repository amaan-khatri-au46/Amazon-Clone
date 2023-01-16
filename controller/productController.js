const productModel = require('../models/productModel');
const base64 = require('js-base64')
const multer = require('multer')
require('dotenv').config();
const cloudinary = require('cloudinary').v2



const getProduct = async(req,res) => {
try {
    const products = await productModel.find()
    // res.status(200).send({status:'success', products})
    res.send(products)
} catch (error) {
    res.status(404).send({status:'error', error})
}

}

const getProductById = async(req,res) => {
  
    const {productId} = req.params
    try {
        const products = await productModel.findById(productId).populate('reviews', { comment: 1, postedOn: 1, _id: 0 })
        if(products) {
          res.status(200).send({status: 'success', products})
        } else {
          res.status(404).send({status: 'error', msg: "product Not found"})
        }
    } catch (error) {
        res.status(404).send({status:'error', msg:'Error fetching product from DB'})
    }

}

cloudinary.config({
    cloud_name: 'dwq7nlnlg',
    api_key: process.env.Cloud_Api_key,
    api_secret: process.env.Cloud_Api_secret,
})

const postProduct = async(req,res) => {

// const productData = req.body
try {
    const data = req.body

        const fileData = req.file
        console.log(fileData)
        let result;
    
        if (fileData) {

            const bufferDataBase64 = base64.encode(fileData.buffer)
            const res = await cloudinary.uploader.upload(`data:${fileData.mimetype};base64,${bufferDataBase64}`)

            data.imageUrl = res.secure_url
            console.log(data)
            result = await productModel.create(data);
            console.log(result)
        }
        res.json('product added successfully');
    // const data = await productModel.create(productData)
    // res.status(200).send({status:'success',msg:'product added successfully' ,product:data,})
} catch (error) {
    res.status(500).send({status:'error', msg:'facing problem posting product in DB'})
}

}

const updateProduct = async(req,res) => {
    const {productId} = req.params
    const updatedData = req.body
    try {
        const products = await productModel.findByIdAndUpdate(productId,updatedData)
        res.status(200).send({status:'success',msg : 'product updated successfully' ,product:updatedData})
    } catch (error) {
        res.status(500).send({status:'error', msg:'error updating product from DB',error})
    }

}

const deleteProduct = async(req,res) => {

    const {productId} = req.params
    try {
        const products = await productModel.findByIdAndDelete(productId)
        res.status(200).send({status:'success',msg:'deleted successfully' ,products})
    } catch (error) {
        res.status(500).send({status:'error', msg:' error deleting product from DB'})
    }
}

module.exports = {
    getProduct,
    getProductById,
    updateProduct,
    postProduct,
    deleteProduct,
}



// const cloud = require('./config/cloud')


// menuRoutes.post("/admin/addMenu",  async (req, res) => {
  

// })
// menuRoutes.get('/items', async (req, res) => {
//     result1 = await Menu.find({})


//     res.send(result1)

// })

// module.exports = menuRoutes