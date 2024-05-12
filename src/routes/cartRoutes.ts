import express from 'express'
import {
  getCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from '../controllers/cartController'

const router = express.Router()

// dohvat cije kosarice
router.get('/', getCart)
// dodavanje proizvoda na kosaricu pomocu product id-a
router.get('/add/:productId', addProductToCart)
// skidanje produkta sa kosarice pomocu product id-a
router.delete('/remove/:productId', removeProductFromCart)
// ciscenje kosarice
router.delete('/clear', clearCart)

export default router
