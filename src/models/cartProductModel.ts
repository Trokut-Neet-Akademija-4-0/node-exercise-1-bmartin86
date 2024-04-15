import ICartProduct from './interfaces/cartProductInterface'
import IProduct from './interfaces/productInterface'

class CartProduct implements ICartProduct {
  constructor(id: number, product: IProduct, quantity: number) {
    this.id = id
    this.product = product
    this.quantity = quantity
  }
  id: number
  product: IProduct
  quantity: number
}
export default CartProduct
