import express from 'express'
import {
  getAllProductsByGenderId,
  getAllGenders,
} from '../controllers/genderController'

const router = express.Router()
router.get('/', getAllGenders)

router.get('/:id/products', getAllProductsByGenderId)

export default router
