import { Request, Response } from 'express'
import cartService from '../services/cartService'
import CartProductAddRequest from '../models/request/cartProductAddRequest'
import CartCustomerInformationRequest from '../models/request/cartCustomerInformationRequest'

const getCart = async (req: Request, res: Response) => {
  res.send(await cartService.getCart())
}

const getCartById = async (req: Request, res: Response) => {
  res.send(await cartService.getCartById(Number.parseInt(req.params.id, 10)))
}

const purchaseCartById = async (req: Request, res: Response) => {
  const customerInformation = req.body as CartCustomerInformationRequest
  res.send(
    await cartService.purchaseCartById(
      Number.parseInt(req.params.id, 10),
      customerInformation,
    ),
  )
}

const addProductToCart = async (req: Request, res: Response) => {
  const cartProductAddRequest = req.body as CartProductAddRequest
  const cartId = Number.parseInt(req.params.cartId, 10)
  const requestedProductId = Number.parseInt(req.params.productId, 10)
  res.send(
    await cartService.addProductById(
      cartId,
      requestedProductId,
      cartProductAddRequest,
    ),
  )
}

const updateCartProductQuantity = async (req: Request, res: Response) => {
  const cartProductAddRequest = req.body as CartProductAddRequest
  const cartId = Number.parseInt(req.params.cartId, 10)
  const requestedProductId = Number.parseInt(req.params.productId, 10)
  res.send(
    await cartService.updateCartProductQuantity(
      cartId,
      requestedProductId,
      cartProductAddRequest,
    ),
  )
}

const removeProductFromCart = async (req: Request, res: Response) => {
  const cartId = Number.parseInt(req.params.cartId, 10)
  const requestedProductId = Number.parseInt(req.params.productId, 10)
  res.send(await cartService.removeProductFromCart(cartId, requestedProductId))
}

const clearCart = async (req: Request, res: Response) => {
  res.send(await cartService.clearCart(Number.parseInt(req.params.cartId, 10)))
}

export {
  getCart,
  getCartById,
  addProductToCart,
  updateCartProductQuantity,
  removeProductFromCart,
  clearCart,
  purchaseCartById,
}
