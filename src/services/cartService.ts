/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express'
import HttpError from '../utils/HttpError'
import Cart from '../entities/Cart'
import ProductCustomer from '../entities/ProductCustomer'
import Customer from '../entities/Customer'
import Transaction from '../entities/Transaction'
import CartProductAddRequest from '../models/request/cartProductAddRequest'
import ProductSizeQuantity from '../entities/ProductSizeQuantity'
import CartCustomerInformationRequest from '../models/request/cartCustomerProductsInformationRequest'

// Cart servis gdje nam se nalazi cila nasa poslovna logika vezana za kosaricu
class CartService {
  async getCart(): Promise<Cart> {
    let nonProcessedCart = await Cart.findOne({
      relations: [
        'customer',
        'customer.address',
        'productCustomers',
        'productCustomers.productSizeQuantity',
        'productCustomers.productSizeQuantity.productSize',
        'productCustomers.productSizeQuantity.product',
        'productCustomers.productSizeQuantity.product.images',
        'transaction',
      ],
      where: {
        isProcessed: false,
      },
    })

    if (!nonProcessedCart) {
      nonProcessedCart = new Cart()
      await nonProcessedCart.save()
    }
    //console.log(`Cart ID: ${nonProcessedCart.cartId}`)
    return nonProcessedCart
  }

  async getCartById(cartId: number): Promise<Cart> {
    let foundCart = await Cart.findOne({
      where: { cartId },
      relations: [
        'customer',
        'customer.address',
        'productCustomers',
        'productCustomers.productSizeQuantity',
        'productCustomers.productSizeQuantity.productSize',
        'productCustomers.productSizeQuantity.product',
        'productCustomers.productSizeQuantity.product.images',
        'transaction',
      ],
    })

    if (!foundCart) {
      throw new HttpError(404, `Cart with id ${cartId} not found`)
    }
    return foundCart
  }

  // dodavanje produkta u kosaricu pomocu produkt id-a, uvijek uveca produkt za 1
  async addProductById(
    cartId: number,
    cartProductId: number,
    cartProductAddRequest: CartProductAddRequest,
  ): Promise<Cart> {
    let cart = await this.getCartById(cartId)

    const product = await ProductSizeQuantity.findOne({
      relations: ['product'],
      where: {
        productSizeQuantityId: cartProductId,
      },
    })

    if (!product) {
      throw new HttpError(404, `Product with id ${cartProductId} not found`)
    }

    const existingCartProduct = cart.productCustomers.find(
      (pc) =>
        Number(pc.productSizeQuantity.productSizeQuantityId) === cartProductId,
    )

    if (existingCartProduct) {
      this.checkIsQuantityValid(
        product,
        cartProductAddRequest.quantity,
        existingCartProduct.quantity,
      )

      existingCartProduct.quantity += cartProductAddRequest.quantity
      await existingCartProduct.save()
    } else {
      this.checkIsQuantityValid(product, cartProductAddRequest.quantity, 0)

      const newCartProduct = ProductCustomer.CreateCartProduct(
        cart,
        product,
        cartProductAddRequest.quantity,
      )
      await newCartProduct.save()
    }

    // Reload the cart to ensure all relations are loaded
    cart = await this.getCartById(cartId)

    await cart.UpdateTotal()
    return cart
  }

  async updateCartProductQuantity(
    cartId: number,
    requestedProductId: number,
    cartProductAddRequest: CartProductAddRequest,
  ): Promise<Cart> {
    let cart = await this.getCartById(cartId)

    const product = await ProductSizeQuantity.findOne({
      relations: ['product', 'product.images'],
      where: {
        productSizeQuantityId: requestedProductId,
      },
    })

    if (!product)
      throw new HttpError(
        404,
        `Product with id ${requestedProductId} not found`,
      )

    let existingQuantityOfProductInCart = 0

    this.checkIsQuantityValid(
      product,
      cartProductAddRequest.quantity,
      existingQuantityOfProductInCart,
    )

    const existingCartProduct = cart.productCustomers.find(
      (pc) =>
        Number(pc.productSizeQuantity.productSizeQuantityId) ===
        requestedProductId,
    )

    if (existingCartProduct) {
      this.checkIsQuantityValid(
        product,
        cartProductAddRequest.quantity,
        existingCartProduct.quantity,
      )

      // += ? =
      existingCartProduct.quantity += cartProductAddRequest.quantity
      await existingCartProduct.save()
    }
    //await cart.UpdateTotal()
    cart = await this.getCartById(cartId)
    return cart
  }

  async removeProductFromCart(
    cartId: number,
    requestedProductId: number,
  ): Promise<Cart> {
    let cart = await this.getCartById(cartId)

    const existingCartProduct = cart.productCustomers.find(
      (pc) =>
        Number(pc.productSizeQuantity.productSizeQuantityId) ===
        requestedProductId,
    )

    if (existingCartProduct) {
      await existingCartProduct.remove()
    }
    cart = await this.getCartById(cartId)
    await cart.UpdateTotal()
    return cart
  }

  async clearCart(cartId: number): Promise<Cart> {
    let cart = await this.getCartById(cartId)
    await ProductCustomer.remove(cart.productCustomers)
    cart = await this.getCartById(cartId)
    await cart.UpdateTotal()
    return cart
  }

  async purchaseCartById(
    customerInformation: CartCustomerInformationRequest,
  ): Promise<Cart> {
    let cart = await this.getCart()
    cart.customer = await Customer.CreateCustomerFromCustomerInformation(
      customerInformation.customer,
    )
    await cart.save()
    const products = customerInformation.products

    // Iterate over products and add them to the cart
    for (const product of products) {
      const {
        id: { productSizeQuantityId },
        quantity,
      } = product

      if (!productSizeQuantityId || quantity == null) {
        throw new Error('Invalid product details')
      }

      // Fetch the ProductSizeQuantity entity
      const productSizeQuantity = await ProductSizeQuantity.findOne({
        where: { productSizeQuantityId },
      })
      console.log('psqID', productSizeQuantityId)
      console.log('psq', productSizeQuantity)

      if (!productSizeQuantity) {
        throw new HttpError(
          404,
          `Product with ID ${productSizeQuantityId} not found`,
        )
      }

      // Check if enough quantity is available
      if (
        !productSizeQuantity.availableQuantity ||
        productSizeQuantity.availableQuantity < quantity
      ) {
        throw new Error(
          `Insufficient quantity for product ID ${productSizeQuantityId}. Available: ${productSizeQuantity.availableQuantity}, Requested: ${quantity}`,
        )
      }

      // Create CartProductAddRequest
      const cartProductAddRequest: CartProductAddRequest = { quantity }

      // Add each product to the cart
      await this.addProductById(
        cart.cartId,
        productSizeQuantityId,
        cartProductAddRequest,
      )
      // Deduct the purchased quantity from available quantity
      productSizeQuantity.availableQuantity -= quantity
      await productSizeQuantity.save()
    }

    // Reload the cart
    cart = await this.getCartById(cart.cartId)

    await cart.UpdateTotal()
    await cart.save()

    if (!cart.transaction) {
      const transaction = new Transaction()
      if (!cart.total) {
        throw new Error(`Invalid transaction. Missing total on ${cart.cartId}`)
      }

      transaction.total = cart.total
      await transaction.save()
      await cart.save()
      cart.transaction = transaction
    }

    cart.isProcessed = true
    await cart.save()
    cart = await this.getCartById(cart.cartId)
    return cart
  }

  checkIsQuantityValid(
    requestedProduct: ProductSizeQuantity,
    requestedQuantity: number,
    existingQuantity: number,
  ): void {
    if (
      !requestedProduct.availableQuantity ||
      requestedProduct.availableQuantity < requestedQuantity + existingQuantity //cartProductAddRequest.quantity
    )
      throw new HttpError(
        404,
        `Existing cart product quantity ${existingQuantity} + new requested quantity ${requestedQuantity} is larger than available: ${requestedProduct.availableQuantity}`,
      )
  }

  async updateCartProductPriceAndAvailableQuantity(cartId: number) {}
}

export default new CartService()
