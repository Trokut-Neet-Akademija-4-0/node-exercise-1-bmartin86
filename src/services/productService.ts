import Product from '../models/interfaces/productInterface'
import products from '../models/productsModel'
import HttpError from '../utils/HttpError'

class ProductService {
  private products: Product[] = products


  getAllProducts(): Product[] {
    return this.products
  }

  getProductById(id: number): Product {
    const foundProduct = this.products.find((product) => product.id === id)
    if (!foundProduct)
      throw new HttpError(404, `Product with id ${id} not found`)
    return foundProduct
  }

  deleteProductById(id: number): Product {
    const indexToDelete = this.products.findIndex(
      (product) => product.id === id,
    )

    if (indexToDelete < 0)
      throw new HttpError(404, `Product with id ${id} not found`)

    const deletedProduct = this.products.splice(indexToDelete, 1)
    return deletedProduct[0]
  }
}

export default new ProductService()
