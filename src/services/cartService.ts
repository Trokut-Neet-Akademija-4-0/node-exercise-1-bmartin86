import CartProduct from '../models/cartProductModel'
import ICart from '../models/interfaces/cartInterface'
import userCart from '../models/cartModel'
import productService from './productService'
import HttpError from '../utils/HttpError'

// Cart servis gdje nam se nalazi cila nasa poslovna logika vezana za kosaricu
class CartService {
  private cart: ICart = userCart

  getCart(): ICart {
    return this.cart
  }

  // dodavanje produkta u kosaricu pomocu produkt id-a, uvijek uveca produkt za 1
  addProductById(id: number): ICart {
    this.changeProductQuantity(id, 1)
    this.updateCartInformation()
    return this.cart
  }

  // skidanje cijelog produkta iz kosarice
  deleteProductById(id: number): ICart {
    const indexToDelete = this.getCartProductIndexByProductId(id)

    if (indexToDelete < 0)
      throw new HttpError(404, `Cart product with id ${id} not found`)

    this.cart.products.splice(indexToDelete, 1)
    this.updateCartInformation()
    return this.cart
  }

  // brisanje svih proizvoda iz kosarice
  clearCart(): ICart {
    this.cart.products = []
    this.updateCartInformation()
    return this.cart
  }

  // metoda koja kreira produkt u kosarici ako ne postoji,
  // uvecava kolicinu ako je quantityModifier pozitivan broj
  // i smanjuje kolicinu ako je negativan, a ako je nula brise produkt iz kosarice
  changeProductQuantity(productId: number, quantityModifier: number): void {
    const product = productService.getProductById(productId)

    try {
      const existingCartProduct = this.getCartProductByProductId(product.id)
      if (existingCartProduct.quantity + quantityModifier > 0)
        existingCartProduct.quantity += quantityModifier
      else this.deleteProductById(existingCartProduct.id)
    } catch (error) {
      if (error instanceof HttpError)
        this.cart.products.push(
          new CartProduct(
            this.getNextAvailableCartProductId(),
            product,
            quantityModifier,
          ),
        )
    }
  }

  // pomocna metoda koja na temelju product id-a nalazi cart product
  getCartProductByProductId(id: number): CartProduct {
    const foundCartProduct = this.cart.products.find(
      (cartProduct) => cartProduct.product.id === id,
    )
    if (!foundCartProduct)
      throw new HttpError(404, `Cart product with product id ${id} not found`)
    return foundCartProduct
  }

  // pomocna metoda koja na temelju product id-a nalazi cart product index
  getCartProductIndexByProductId(id: number): number {
    const cartProductIndex = this.cart.products.findIndex(
      (cartProduct) => cartProduct.product.id === id,
    )
    if (cartProductIndex < 0)
      throw new HttpError(404, `Cart product with product id ${id} not found`)
    return cartProductIndex
  }

  // pomocna metoda koja provjerava koji je cart product id najveci
  // i vraca broj uvecan za 1 da bi nam bio dostupan id
  getNextAvailableCartProductId(): number {
    let greatestId = 0
    this.cart.products.forEach((cartProduct) => {
      greatestId = cartProduct.id > greatestId ? cartProduct.id : greatestId
    })
    return greatestId + 1
  }

  updateCartInformation() {
    let totalQuantity = 0
    let total = 0
    let totalDiscounted = 0
    this.cart.products.forEach((cartProduct) => {
      const totalProductPrice = cartProduct.quantity * cartProduct.product.price
      total += totalProductPrice
      totalDiscounted +=
        totalProductPrice -
        totalProductPrice * (cartProduct.product.discountPercentage / 100)
      totalQuantity += cartProduct.quantity
    })

    this.cart.total = total
    this.cart.discountedTotal = totalDiscounted
    this.cart.totalProducts = this.cart.products.length
    this.cart.totalQuantity = totalQuantity
  }
}

export default new CartService()
