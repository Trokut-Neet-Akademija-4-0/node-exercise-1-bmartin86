import Category from '../entities/Category'

class CategoryService {
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
