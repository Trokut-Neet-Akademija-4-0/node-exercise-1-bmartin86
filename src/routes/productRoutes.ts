import express from 'express'
import {
  addProductImages,
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductImages,
  updateImages,
  updateProductById,
  deleteImageById,
} from '../controllers/productController'

const router = express.Router()

// dohvacanje svih produkta kao liste
router.get('/', getAllProducts)

router.put('/images/:id', updateImages)
// dohvacanje jednog produkta kao detalji produkta pomocu product id-a
router.get('/:id', getProductById)

router.put('/:id', updateProductById)

router.delete('/:id', deleteProductById)

router.post('/', createProduct)

router.get('/:id/images', getProductImages)

router.post('/:id/images', addProductImages)

router.delete('/pictures/:id', deleteImageById)

export default router
