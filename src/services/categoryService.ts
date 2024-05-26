import { IsNull } from 'typeorm'
import Category from '../entities/Category'
import Product from '../entities/Product'
import HttpError from '../utils/HttpError'
import Gender from '../entities/Gender'

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
      relations: [
        'images',
        'gender',
        'category',
        'productSizeQuantities',
        'productSizeQuantities.productSize',
      ],
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

  async getAllGenders(): Promise<Gender[]> {
    return Gender.find({
      order: {
        genderName: 'DESC',
      },
    })
  }

  async getAllProductsByGenderId(id: number): Promise<Product[]> {
    console.log('Fetching products for gender ID:', id)
    const products = await Product.find({
      relations: [
        'images',
        'gender',
        'category',
        'productSizeQuantities',
        'productSizeQuantities.productSize',
      ],
      where: {
        deletedAt: IsNull(),
        gender: {
          genderId: id,
        },
      },
    })

    if (products.length === 0) {
      console.error('No products found for gender ID:', id)
      throw new HttpError(404, 'There are no products in the selected category')
    }

    return products
  }
}

export default new CategoryService()
