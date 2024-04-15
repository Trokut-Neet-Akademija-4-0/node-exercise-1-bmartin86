import ICart from './interfaces/cartInterface'
import ICartProduct from './interfaces/cartProductInterface'

// Cart klasa nam treba da bi pratili stanje kosarice
// a posto se ona dinamicki generira jer nemamo gotov JSON
// onda je bolje da je kreiramo sa klasom i rijeci new pri exportu
class Cart implements ICart {
  constructor() {
    this.id = 0
    this.products = []
    this.total = 0
    this.discountedTotal = 0
    this.totalProducts = 0
    this.totalQuantity = 0
    this.userId = 0
  }

  products: ICartProduct[]

  id: number

  total: number

  discountedTotal: number

  userId: number

  totalProducts: number

  totalQuantity: number
}

export default new Cart()
