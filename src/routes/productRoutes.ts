import express from 'express'
import {
  getAllProducts,
  getProductById,
} from '../controllers/productController'

const router = express.Router()

// dohvacanje svih produkta kao liste
router.get('/', getAllProducts)
// dohvacanje jednog produkta kao detalji produkta pomocu product id-a
router.get('/:id', getProductById)

export default router
