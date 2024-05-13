import express from 'express'
import { deleteCategoryById } from '../controllers/categoryController'

const router = express.Router()

router.delete('/:id', deleteCategoryById)

export default router
