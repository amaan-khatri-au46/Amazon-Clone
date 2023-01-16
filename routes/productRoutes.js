const {Router} = require('express')
const multer = require('multer')
// const cloudinary = require('cloudinary').v2

const upload = multer({
  storage: multer.memoryStorage()
})

const {
    getProduct,
    getProductById,
    updateProduct,
    postProduct,
    deleteProduct,
    
} = require('../controller/productController')
const { getAllReview, addReview, deleteReview } = require('../controller/reviewController')

const {
    verifyToken,
    isAdmin,
  } = require('../middleware/middleware')


const productRouter = new Router()

productRouter.use(verifyToken)
// verifytoken middleware

productRouter.get('/',getProduct)
productRouter.get('/:productId',getProductById)

// riview routes
productRouter.get('/:productId/reviews',getAllReview)
productRouter.post('/:productId/reviews',addReview)
productRouter.delete('/:productId/reviews/:reviewId',deleteReview)

// admin authorization middleware
productRouter.use(isAdmin)

productRouter.post('/',upload.single('productImage'),postProduct)
productRouter.put('/:productId',updateProduct)
productRouter.delete('/:productId',deleteProduct)



module.exports = productRouter