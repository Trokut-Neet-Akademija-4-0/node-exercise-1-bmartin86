import express from 'express'
import {
  getCart,
  getCartById,
  addProductToCart,
  updateCartProductQuantity,
  removeProductFromCart,
  purchaseCartById,
  clearCart,
} from '../controllers/cartController'

const router = express.Router()

// dohvat cije kosarice
router.get('/', getCart)
router.get('/:id', getCartById)
// kupnja kosarice po id-u
router.post('/purchase', purchaseCartById)
// dodavanje proizvoda na kosaricu pomocu product id-a
router.post('/:cartId/products/:productId/add', addProductToCart)
// update kolicine proizvoda u kosarici
router.put('/:cartId/products/:productId', updateCartProductQuantity)
// skidanje produkta sa kosarice pomocu product id-a
router.delete('/:cartId/products/:productId', removeProductFromCart)
// ciscenje kosarice
router.delete('/:cartId/clear', clearCart)

export default router
