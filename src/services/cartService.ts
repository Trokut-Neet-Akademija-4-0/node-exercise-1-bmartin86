/* eslint-disable class-methods-use-this */
import HttpError from '../utils/HttpError'
import Cart from '../entities/Cart'
import ProductCustomer from '../entities/ProductCustomer'
import Customer from '../entities/Customer'
import Transaction from '../entities/Transaction'
import CartProductAddRequest from '../models/request/cartProductAddRequest'
import ProductSizeQuantity from '../entities/ProductSizeQuantity'
import CartCustomerInformationRequest from '../models/request/cartCustomerInformationRequest'

// Cart servis gdje nam se nalazi cila nasa poslovna logika vezana za kosaricu
class CartService {
  // dodavanje produkta u kosaricu pomocu produkt id-a, uvijek uveca produkt za 1
  async getCart(): Promise<Cart> {
    let nonProcessedCart = await Cart.findOne({
      relations: [
        'customer',
        'productCustomers',
        'productCustomers.productSizeQuantity.product',
        'productCustomers.productSizeQuantity.product.images',
      ],
      where: {
        isProcessed: false,
      },
    })
    //console.log('all non processed carts :', nonProcessedCart)
    if (!nonProcessedCart) {
      nonProcessedCart = new Cart()
      nonProcessedCart = await nonProcessedCart.save()
    }
    return nonProcessedCart
  }

  async getCartById(cartId: number): Promise<Cart> {
    let foundCart = await Cart.findOne({
      relations: [
        'customer',
        'customer.address',
        'productCustomers',
        'productCustomers.productSizeQuantity.product',
        'productCustomers.productSizeQuantity.product.images',
        'transaction',
      ],
      where: {
        cartId: cartId,
      },
    })
    //console.log('get cart by id => ', foundCart)
    if (!foundCart)
      throw new HttpError(404, `Cart cart with id ${cartId} not found`)
    return foundCart
  }

  // dodavanje produkta u kosaricu pomocu produkt id-a, uvijek uveca produkt za 1
  async addProductById(
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

    console.log('product as ProductSizeQuantity => ', product)

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

    console.log('product in cart => ', existingCartProduct)

    if (existingCartProduct) {
      this.checkIsQuantityValid(
        product,
        cartProductAddRequest.quantity,
        existingCartProduct.quantity,
      )

      existingCartProduct.quantity += cartProductAddRequest.quantity
      await existingCartProduct.save()
    } else {
      const newCartProduct = ProductCustomer.CreateCartProduct(
        cart,
        product,
        cartProductAddRequest.quantity,
      )
      await newCartProduct.save()
    }

    cart = await this.getCartById(cartId)

    console.log('cart =>', cart)

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

    console.log('product as ProductSizeQuantity => ', product)

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

    console.log('product in cart => ', existingCartProduct)

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
    await cart.UpdateTotal()
    return cart
  }

  async removeProductFromCart(
    cartId: number,
    requestedProductId: number,
  ): Promise<Cart> {
    let cart = await this.getCartById(cartId)

    console.log('cart =>', cart)

    const existingCartProduct = cart.productCustomers.find(
      (pc) =>
        Number(pc.productSizeQuantity.productSizeQuantityId) ===
        requestedProductId,
    )

    console.log('product in cart => ', existingCartProduct)

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
    cartId: number,
    customerInformation: CartCustomerInformationRequest,
  ): Promise<Cart> {
    const cart = await this.getCartById(cartId)
    if (cart.isProcessed) {
      throw new Error(`Cart with id ${cartId} already processed`)
    }
    const customer = await Customer.CreateCustomerFromCustomerInformation(
      customerInformation.customer,
    )
    cart.customer = customer
    cart.isProcessed = true
    if (!cart.transaction) {
      const transaction = new Transaction()
      if (!cart.total) {
        throw new Error(`Invalid transaction. Missing total on ${cartId}`)
      }
      transaction.total = cart.total
      await transaction.save()
      cart.transaction = transaction
    }
    await cart.save()
    return this.getCartById(cartId)
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
}

export default new CartService()
