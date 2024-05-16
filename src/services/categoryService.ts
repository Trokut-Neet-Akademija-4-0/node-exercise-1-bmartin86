import { IsNull } from 'typeorm'
import Category from '../entities/Category'
import Product from '../entities/Product'
import HttpError from '../utils/HttpError'

class CategoryService {
  async getAllCategories(): Promise<Category[]> {
    return Category.find({
      order: {
        categoryName: 'ASC',
      },
    })
  }

  async getAllProductsByCategoryId(id: number): Promise<Product[]> {
    const products = await Product.find({
      relations: {
        category: true,
      },
      where: {
        deletedAt: IsNull(),
        category: {
          categoryId: id,
        },
      },
    })
    if (!products)
      throw new HttpError(404, `There are no products in selected category`)
    return products
  }

  async deleteCategoryById(id: number): Promise<Category | void> {
    const existingCategory = await Category.findOne({
      where: {
        categoryId: id,
      },
    })
    if (existingCategory) {
      return existingCategory.remove()
    }
    return undefined
  }
}

export default new CategoryService()
