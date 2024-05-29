import express from 'express'
import {
  deleteCategoryById,
  getAllProductsByCategoryId,
  getAllCategories,
} from '../controllers/categoryController'

const router = express.Router()
router.get('/', getAllCategories)

router.get('/:id/products', getAllProductsByCategoryId)

router.delete('/:id', deleteCategoryById)

export default router
