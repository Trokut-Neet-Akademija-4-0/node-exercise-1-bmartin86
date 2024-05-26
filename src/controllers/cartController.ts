import { Request, Response } from 'express'
import cartService from '../services/cartService'
import CartProductAddRequest from '../models/request/cartProductAddRequest'
import CartCustomerProductsInformationRequest from '../models/request/cartCustomerProductsInformationRequest'

const getCart = async (req: Request, res: Response) => {
  res.send(await cartService.getCart())
}

const getCartById = async (req: Request, res: Response) => {
  res.send(await cartService.getCartById(Number.parseInt(req.params.id, 10)))
}

const purchaseCartById = async (req: Request, res: Response) => {
  try {
    const customerInformation =
      req.body as CartCustomerProductsInformationRequest

    // If you need to parse the cart ID from the request parameters, uncomment and use the following line:
    // const cartId = Number.parseInt(req.params.id, 10);

    const purchaseResponse =
      await cartService.purchaseCartById(customerInformation)

    res.status(200).send(purchaseResponse)
  } catch (error) {
    console.error('Error purchasing cart:', error)
    res
      .status(500)
      .send({ error: 'An error occurred while processing your request.' })
  }
}

const addProductToCart = async (req: Request, res: Response) => {
  const cartProductAddRequest = req.body as CartProductAddRequest
  const cartId = Number.parseInt(req.params.cartId, 10)
  const requestedProductId = Number.parseInt(req.params.productId, 10)
  res.send(
    await cartService.addProductById(
      requestedProductId,
      cartId,
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
